'use client';

import React, { Key, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react';
import { redirect } from 'next/navigation';
import { snakeCaseToTitleCase } from '@utils/string-utils';
import { useCreateTicket } from '@/app/tickets/_api/ticketComponents';
import { useSession } from 'next-auth/react';
import { ApiError } from '@/app/tickets/_api/ticketCustomSchemas';

export interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ticketCategories: string[] = [
  'bug',
  'payment_issue',
  'feature_request',
  'other'
];
export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose
}: CreateTicketModalProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [value, setValue] = useState('');
  const { data: session } = useSession();
  const { mutate: createConversation, isLoading: loading } = useCreateTicket(
    {}
  );

  const [selectedReason, setSelectedReason] = useState<string>();

  function handleMutation() {
    if (!selectedReason) return setError('Please select a category');
    createConversation(
      {
        body: {
          title: selectedReason,
          test: value,
          userId: session?.user.id!,
          status: 'active'
        }
      },
      {
        onSuccess: (e) => {
          onClose();
          redirect(`/tickets/${e.id}`);
        },
        onError: (e) => {
          console.table(e);
          setError((e as ApiError).stack?.detail);
        }
      }
    );
  }

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Ticket
            </ModalHeader>
            <ModalBody>
              <Select
                isRequired
                label="Ticket Category"
                placeholder="Select a category"
                defaultSelectedKeys={['cat']}
                className="max-w-xs"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value as string)}
              >
                {ticketCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {snakeCaseToTitleCase(category)}
                  </SelectItem>
                ))}
              </Select>
              <Textarea
                minRows={5}
                required
                placeholder="How can we help you?"
                labelPlacement="outside"
                description="Be as specific as possible. This is a direct message to the site admin. We will get back to you as soon as possible."
                value={value}
                onValueChange={setValue}
              />
              {error && (
                <div
                  className="w-full bg-danger-50 text-danger rounded-xl py-2 text-sm text-center font-semibold"
                  hidden={!error}
                >
                  {error}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                onPress={onClose}
                disabled={isOpen}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleMutation}
                isLoading={loading}
              >
                Create Ticket
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
