import { SVGProps } from 'react';
import { OrderStatus, ReportStatus, TicketStatus } from '@/api/apiSchemas';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  fill?: string;
};

export type TypegraphyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;

export type ChipVariant =
  | 'light'
  | 'shadow'
  | 'flat'
  | 'dot'
  | 'solid'
  | 'bordered'
  | 'faded'
  | undefined;

export type Role = 'buyer' | 'seller' | 'support' | 'admin';

export const RoleChipColor: Record<Role, TypegraphyColor> = {
  admin: 'danger',
  support: 'success',
  seller: 'warning',
  buyer: 'primary'
};

export const ReportStatusChipColor: Record<ReportStatus, TypegraphyColor> = {
  active: 'warning',
  resolved: 'success',
  refunded: 'danger',
  closed: 'secondary'
};

export const OrderStatusChipColor: Record<OrderStatus, TypegraphyColor> = {
  completed: 'success',
  pending: 'secondary',
  disputed: 'warning',
  refunded: 'danger'
};

export const TicketStatusChipColor: Record<TicketStatus, TypegraphyColor> = {
  active: 'warning',
  closed: 'success'
};
