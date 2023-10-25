'use client';

import { Skeleton } from '@nextui-org/react';
import React from 'react';
import { TicketActionsCard } from '@/app/tickets/_components/ticket-actions-card';
import {
  useCreateComment,
  useGetTicketById
} from '@/app/tickets/_api/ticketComponents';
import { ConversationCard } from '@/app/tickets/_components/conversation-card';

export default function TicketDetailsPage({
  params
}: {
  params: { id: string };
}) {
  const { data, isLoading, isError } = useGetTicketById({
    pathParams: {
      id: parseInt(params.id)
    }
  });

  if (!data || isLoading) return <Skeleton className="h-12 rounded-xl" />;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-col gap-1 min-w-[250px] max-w-sm">
          <TicketActionsCard
            ticket_id={data.id.toString()}
            status={data.status}
          />
        </div>
        <ConversationCard
          id={data.id.toString()}
          initial_text={data.test}
          comments={data.comments}
          useNewMessageMutation={useCreateComment}
        />
      </div>
    </>
  );
}
