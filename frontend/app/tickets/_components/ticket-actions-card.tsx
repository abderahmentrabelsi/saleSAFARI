import { Button, Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import { subtitle } from '@components/primitives';
import React, { Key, useState } from 'react';
import { CheckmarkIcon, SendIcon } from '@components/icons';
import { snakeCaseToTitleCase } from '@utils/string-utils';
import { Snippet } from '@nextui-org/snippet';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTicketStatus } from '@/app/tickets/_api/ticketComponents';

interface TicketActionsCardProps {
  ticket_id: string;
  status: string;
}

const ticketStatuses: string[] = ['closed', 'active'];

export const TicketActionsCard = ({
  ticket_id,
  status
}: TicketActionsCardProps) => {
  const { mutate: updateTicketStatus, isLoading: isTicketStatusUpdating } =
    useUpdateTicketStatus({});

  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<string>();

  const handleSend = () => {
    if (selectedStatus && selectedStatus !== status) {
      updateTicketStatus(
        {
          pathParams: {
            id: parseInt(ticket_id),
            status: selectedStatus
          }
        },
        {
          onSuccess: (e) => {
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'tickets'
            });
            console.log(e);
          },
          onError: (e) => {
            console.error(e);
          }
        }
      );
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <span className={subtitle()}>Actions</span>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-2">
            <span className="text-md">
              Ticket ID: <Snippet size="sm">{ticket_id}</Snippet>
            </span>
            <div className="flex flex-row gap-1">
              <span className="text-md">Ticket Status: </span>
              <Chip color="primary" variant="flat" size="sm">
                {status.toUpperCase()}
              </Chip>
            </div>
            <div className="flex flex-row gap-1">
              <Select
                isRequired
                label="Status"
                size="sm"
                placeholder="Select status"
                defaultSelectedKeys={[status]}
                className="max-w-xs"
                selectedKeys={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as string)}
              >
                {ticketStatuses.map((reportStatus: string) => (
                  <SelectItem key={reportStatus} value={reportStatus}>
                    {snakeCaseToTitleCase(reportStatus)}
                  </SelectItem>
                ))}
              </Select>

              <Button
                isIconOnly
                color="primary"
                className="w-full sm:w-fit"
                disabled={selectedStatus === status}
                isLoading={isTicketStatusUpdating}
                onClick={handleSend}
                size="lg"
              >
                <CheckmarkIcon />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
