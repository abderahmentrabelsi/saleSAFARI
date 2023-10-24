'use client';

import {
  useAddCommentTicketsTicketIdCommentsPost,
  useGetTicketTicketsTicketIdGet
} from '@/api/apiComponents';
import { Skeleton } from '@nextui-org/react';
import { ConversationCard } from '@components/cards/conversation-card';
import React from 'react';
import { TicketActionsCard } from '@/app/tickets/_components/ticket-actions-card';

export default function TicketDetailsPage({
  params
}: {
  params: { id: string };
}) {
  const { data, isLoading, isError } = useGetTicketTicketsTicketIdGet({
    pathParams: {
      ticketId: params.id
    }
  });

  if (!data || isLoading) return <Skeleton className="h-12 rounded-xl" />;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-col gap-1 max-w-sm">
          <TicketActionsCard ticket_id={data.id} status={data.status} />
        </div>
        <ConversationCard
          id={data.id}
          initial_text={data.initial_text}
          comments={data.comments}
          useNewMessageMutation={useAddCommentTicketsTicketIdCommentsPost}
        />
      </div>
    </>
  );
}
