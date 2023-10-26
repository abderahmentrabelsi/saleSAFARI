'use client';

import { useGetTicketByUserId } from '@/app/tickets/_api/ticketComponents';
import { Chip, Link, Skeleton, Tooltip } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import PaginatedTable, {
  RenderTableCellProps
} from '@components/tables/base/paginated-table';
import React from 'react';
import { EyeIcon } from '@nextui-org/shared-icons';
import { TicketReadDTO } from '@/app/tickets/_api/ticketSchemas';
import { TypegraphyColor } from '@/types';
import { CreateTicketButton } from '@/app/tickets/_components/create-ticket-button';

const RenderTicketCell: React.FC<RenderTableCellProps<TicketReadDTO>> = ({
  columnKey,
  item
}) => {
  switch (columnKey) {
    case 'status':
      let color: TypegraphyColor = 'default';
      switch (item[columnKey]) {
        case 'active':
          color = 'warning';
          break;
        case 'closed':
          color = 'success';
          break;
        default:
          color = 'default';
      }
      return (
        <Chip color={color} variant="flat" size="sm">
          {(item[columnKey] || 'active').toUpperCase()}
        </Chip>
      );
    case 'title':
      return <span className="text-primary">{item[columnKey]}</span>;
    case 'test':

    case 'comments':
      return <span>{(item[columnKey] || []).length}</span>;
    default:
      return <span>{item[columnKey]}</span>;
  }
};

export default function TicketsPage() {
  const { data: session } = useSession();
  if (!session) {
    return <h1>Unauthenticated.</h1>;
  }

  return (
    <>
      <CreateTicketButton />
      <PaginatedTable
        useQuery={useGetTicketByUserId}
        useQueryPathParams={{ userId: session.user.id }}
        excludeKeys={['id' as never, 'test' as never, 'userId' as never]}
        RenderCell={RenderTicketCell}
        actions={(id) => (
          <>
            <Tooltip content="Check" color="primary">
              <span className="text-2xl text-primary cursor-pointer active:opacity-50">
                <Link href={`/tickets/${id}`}>
                  <EyeIcon />
                </Link>
              </span>
            </Tooltip>
          </>
        )}
      />
    </>
  );
}
