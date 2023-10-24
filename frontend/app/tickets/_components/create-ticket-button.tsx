import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { ReportIcon } from '@components/icons';
import React from 'react';
import { CreateTicketModal } from '@/app/tickets/_components/create-ticket-modal';

export const CreateTicketButton = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateTicketModal isOpen={isOpen} onClose={onClose} />
      <Button color="primary" onClick={onOpen}>
        Create Ticket
      </Button>
    </>
  );
};
