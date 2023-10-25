import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Textarea
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { SendIcon } from '@components/icons';
import { subtitle } from '@components/primitives';
import { parseISO } from 'date-fns';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { CommentReadDTO } from '@/app/tickets/_api/ticketSchemas';
import { useSession } from 'next-auth/react';

interface ConversationThreadProps {
  messages: CommentReadDTO[];
  conversationId: string;
  useAddCommentMutation: (
    args: any
  ) => UseMutationResult<CommentReadDTO, any, any>;
}

const ConversationThread: React.FC<ConversationThreadProps> = ({
  messages,
  conversationId,
  useAddCommentMutation
}: ConversationThreadProps) => {
  const [value, setValue] = useState<string | undefined>('');
  const { mutate: sendMessage, isLoading: isMessageSending } =
    useAddCommentMutation({});
  const [isMessageValid, setIsMessageValid] = useState<boolean>(false);
  const { data: session } = useSession();
  useEffect(() => {
    setIsMessageValid(!!value && value.length > 1);
  }, [value]);
  const queryClient = useQueryClient();

  if (!messages) return <span>No messages</span>;

  const handleSend = () => {
    if (value) {
      sendMessage(
        {
          body: {
            ticketId: conversationId,
            userId: session?.user?.id,
            text: value
          }
        },
        {
          onSuccess: async (e) => {
            await queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'tickets'
            });
          },
          onError: (e) => {
            console.error(e);
          }
        }
      );
      setValue('');
    }
  };

  return (
    <>
      {messages.map(({ text }, index) => (
        <div key={`thread-div-${index}`}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row place-content-between items-center gap-1">
              <div className="flex items-center gap-2">
                <h4>
                  <b>admin</b>
                </h4>
              </div>
            </div>
            <span>{text}</span>
          </div>
          <Divider className="my-2" />
        </div>
      ))}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Textarea
          isRequired
          isInvalid={!isMessageValid}
          variant="faded"
          labelPlacement="outside"
          placeholder="Type your message..."
          description="Remember to be helpful and kind to others."
          errorMessage="Your message must be at least 32 characters long."
          value={value}
          onValueChange={setValue}
          disabled={isMessageSending}
        />
        <Button
          isIconOnly
          color="primary"
          className="w-full sm:w-fit"
          disabled={!isMessageValid}
          isLoading={isMessageSending}
          onClick={handleSend}
        >
          <SendIcon />
        </Button>
      </div>
    </>
  );
};

export default ConversationThread;
