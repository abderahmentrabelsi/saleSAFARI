import { CardBody, CardHeader } from '@nextui-org/card';
import { subtitle } from '@components/primitives';
import { Card, Divider } from '@nextui-org/react';
import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { CommentReadDTO } from '@/app/tickets/_api/ticketSchemas';
import ConversationThread from '@/app/tickets/_components/conversation-thread';

export interface ConversationCardProps {
  id: string;
  initial_text: string;
  comments: CommentReadDTO[];
  useNewMessageMutation: () => UseMutationResult<any, any, any>;
}

export const ConversationCard = ({
  id,
  initial_text,
  comments,
  useNewMessageMutation
}: ConversationCardProps) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <span className={subtitle()}>Conversation</span>
      </CardHeader>

      <CardBody>
        <div className="flex flex-col gap-1">
          <b>Chief Complaint</b>
          <span>{initial_text}</span>
        </div>

        <Divider className="my-2" />

        <ConversationThread
          messages={comments}
          conversationId={id}
          useAddCommentMutation={useNewMessageMutation}
        />
      </CardBody>
    </Card>
  );
};
