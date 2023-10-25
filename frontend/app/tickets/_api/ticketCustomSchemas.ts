import { UseQueryResult } from '@tanstack/react-query';

export type IdentifiableSchema = { id: number };
export interface PaginatedQueryParams<
  TPathParams extends Record<string, string> = Record<string, string>
> {
  queryParams: {
    skip: number;
    limit: number;
  };
  pathParams: TPathParams;
}
export interface PaginatedResponse<TEntity extends IdentifiableSchema> {
  total: number;
  total_pages: number;
  current_page: number;
  items: TEntity[];
}

export type PaginatedQueryResponse<TEntity extends IdentifiableSchema> =
  UseQueryResult<PaginatedResponse<TEntity>>;

export type PaginatedQuery<
  TEntity extends IdentifiableSchema,
  VPathParams extends Record<string, string> = Record<string, string>
> = (
  params: PaginatedQueryParams<VPathParams>
) => PaginatedQueryResponse<TEntity>;

export type ApiError = Record<string, string | number | object> & {
  stack?: {
    detail: string;
  };
};
