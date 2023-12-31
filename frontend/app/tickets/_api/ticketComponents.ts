/**
 * Generated by @openapi-codegen
 *
 * @version v0
 */
import * as reactQuery from '@tanstack/react-query';
import { useTicketContext, TicketContext } from './ticketContext';
import type * as Fetcher from './ticketFetcher';
import { ticketFetch } from './ticketFetcher';
import type * as Schemas from './ticketSchemas';

export type GetTicketByIdPathParams = {
  /**
   * @format int32
   */
  id: number;
};

export type GetTicketByIdError = Fetcher.ErrorWrapper<undefined>;

export type GetTicketByIdVariables = {
  pathParams: GetTicketByIdPathParams;
} & TicketContext['fetcherOptions'];

export const fetchGetTicketById = (
  variables: GetTicketByIdVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    Schemas.TicketReadDTO,
    GetTicketByIdError,
    undefined,
    {},
    {},
    GetTicketByIdPathParams
  >({ url: '/tickets/{id}', method: 'get', ...variables, signal });

export const useGetTicketById = <TData = Schemas.TicketReadDTO>(
  variables: GetTicketByIdVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      Schemas.TicketReadDTO,
      GetTicketByIdError,
      TData
    >,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useTicketContext(options);
  return reactQuery.useQuery<Schemas.TicketReadDTO, GetTicketByIdError, TData>({
    queryKey: queryKeyFn({
      path: '/tickets/{id}',
      operationId: 'getTicketById',
      variables
    }),
    queryFn: ({ signal }) =>
      fetchGetTicketById({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions
  });
};

export type UpdateTicketPathParams = {
  /**
   * @format int32
   */
  id: number;
};

export type UpdateTicketError = Fetcher.ErrorWrapper<undefined>;

export type UpdateTicketVariables = {
  body?: Schemas.TicketCreateDTO;
  pathParams: UpdateTicketPathParams;
} & TicketContext['fetcherOptions'];

export const fetchUpdateTicket = (
  variables: UpdateTicketVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    Schemas.TicketReadDTO,
    UpdateTicketError,
    Schemas.TicketCreateDTO,
    {},
    {},
    UpdateTicketPathParams
  >({ url: '/tickets/{id}', method: 'put', ...variables, signal });

export const useUpdateTicket = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.TicketReadDTO,
      UpdateTicketError,
      UpdateTicketVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useTicketContext();
  return reactQuery.useMutation<
    Schemas.TicketReadDTO,
    UpdateTicketError,
    UpdateTicketVariables
  >({
    mutationFn: (variables: UpdateTicketVariables) =>
      fetchUpdateTicket({ ...fetcherOptions, ...variables }),
    ...options
  });
};

export type DeleteTicketPathParams = {
  /**
   * @format int32
   */
  id: number;
};

export type DeleteTicketError = Fetcher.ErrorWrapper<undefined>;

export type DeleteTicketVariables = {
  pathParams: DeleteTicketPathParams;
} & TicketContext['fetcherOptions'];

export const fetchDeleteTicket = (
  variables: DeleteTicketVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    undefined,
    DeleteTicketError,
    undefined,
    {},
    {},
    DeleteTicketPathParams
  >({ url: '/tickets/{id}', method: 'delete', ...variables, signal });

export const useDeleteTicket = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      undefined,
      DeleteTicketError,
      DeleteTicketVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useTicketContext();
  return reactQuery.useMutation<
    undefined,
    DeleteTicketError,
    DeleteTicketVariables
  >({
    mutationFn: (variables: DeleteTicketVariables) =>
      fetchDeleteTicket({ ...fetcherOptions, ...variables }),
    ...options
  });
};

export type UpdateTicketStatusPathParams = {
  /**
   * @format int32
   */
  id: number;
  status: string;
};

export type UpdateTicketStatusError = Fetcher.ErrorWrapper<undefined>;

export type UpdateTicketStatusVariables = {
  pathParams: UpdateTicketStatusPathParams;
} & TicketContext['fetcherOptions'];

export const fetchUpdateTicketStatus = (
  variables: UpdateTicketStatusVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    Schemas.TicketReadDTO,
    UpdateTicketStatusError,
    undefined,
    {},
    {},
    UpdateTicketStatusPathParams
  >({
    url: '/tickets/{id}/status/{status}',
    method: 'put',
    ...variables,
    signal
  });

export const useUpdateTicketStatus = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.TicketReadDTO,
      UpdateTicketStatusError,
      UpdateTicketStatusVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useTicketContext();
  return reactQuery.useMutation<
    Schemas.TicketReadDTO,
    UpdateTicketStatusError,
    UpdateTicketStatusVariables
  >({
    mutationFn: (variables: UpdateTicketStatusVariables) =>
      fetchUpdateTicketStatus({ ...fetcherOptions, ...variables }),
    ...options
  });
};

export type GetCommentByIdPathParams = {
  /**
   * @format int32
   */
  id: number;
};

export type GetCommentByIdError = Fetcher.ErrorWrapper<undefined>;

export type GetCommentByIdVariables = {
  pathParams: GetCommentByIdPathParams;
} & TicketContext['fetcherOptions'];

export const fetchGetCommentById = (
  variables: GetCommentByIdVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    Schemas.CommentReadDTO,
    GetCommentByIdError,
    undefined,
    {},
    {},
    GetCommentByIdPathParams
  >({ url: '/comments/{id}', method: 'get', ...variables, signal });

export const useGetCommentById = <TData = Schemas.CommentReadDTO>(
  variables: GetCommentByIdVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      Schemas.CommentReadDTO,
      GetCommentByIdError,
      TData
    >,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useTicketContext(options);
  return reactQuery.useQuery<
    Schemas.CommentReadDTO,
    GetCommentByIdError,
    TData
  >({
    queryKey: queryKeyFn({
      path: '/comments/{id}',
      operationId: 'getCommentById',
      variables
    }),
    queryFn: ({ signal }) =>
      fetchGetCommentById({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions
  });
};

export type UpdateCommentPathParams = {
  /**
   * @format int32
   */
  id: number;
};

export type UpdateCommentError = Fetcher.ErrorWrapper<undefined>;

export type UpdateCommentVariables = {
  body?: Schemas.CommentCreateDTO;
  pathParams: UpdateCommentPathParams;
} & TicketContext['fetcherOptions'];

export const fetchUpdateComment = (
  variables: UpdateCommentVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    Schemas.CommentReadDTO,
    UpdateCommentError,
    Schemas.CommentCreateDTO,
    {},
    {},
    UpdateCommentPathParams
  >({ url: '/comments/{id}', method: 'put', ...variables, signal });

export const useUpdateComment = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.CommentReadDTO,
      UpdateCommentError,
      UpdateCommentVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useTicketContext();
  return reactQuery.useMutation<
    Schemas.CommentReadDTO,
    UpdateCommentError,
    UpdateCommentVariables
  >({
    mutationFn: (variables: UpdateCommentVariables) =>
      fetchUpdateComment({ ...fetcherOptions, ...variables }),
    ...options
  });
};

export type DeleteCommentPathParams = {
  /**
   * @format int32
   */
  id: number;
};

export type DeleteCommentError = Fetcher.ErrorWrapper<undefined>;

export type DeleteCommentVariables = {
  pathParams: DeleteCommentPathParams;
} & TicketContext['fetcherOptions'];

export const fetchDeleteComment = (
  variables: DeleteCommentVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    undefined,
    DeleteCommentError,
    undefined,
    {},
    {},
    DeleteCommentPathParams
  >({ url: '/comments/{id}', method: 'delete', ...variables, signal });

export const useDeleteComment = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      undefined,
      DeleteCommentError,
      DeleteCommentVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useTicketContext();
  return reactQuery.useMutation<
    undefined,
    DeleteCommentError,
    DeleteCommentVariables
  >({
    mutationFn: (variables: DeleteCommentVariables) =>
      fetchDeleteComment({ ...fetcherOptions, ...variables }),
    ...options
  });
};

export type GetAllTicketsError = Fetcher.ErrorWrapper<undefined>;

export type GetAllTicketsResponse = Schemas.TicketReadDTO[];

export type GetAllTicketsVariables = TicketContext['fetcherOptions'];

export const fetchGetAllTickets = (
  variables: GetAllTicketsVariables,
  signal?: AbortSignal
) =>
  ticketFetch<GetAllTicketsResponse, GetAllTicketsError, undefined, {}, {}, {}>(
    { url: '/tickets', method: 'get', ...variables, signal }
  );

export const useGetAllTickets = <TData = GetAllTicketsResponse>(
  variables: GetAllTicketsVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      GetAllTicketsResponse,
      GetAllTicketsError,
      TData
    >,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useTicketContext(options);
  return reactQuery.useQuery<GetAllTicketsResponse, GetAllTicketsError, TData>({
    queryKey: queryKeyFn({
      path: '/tickets',
      operationId: 'getAllTickets',
      variables
    }),
    queryFn: ({ signal }) =>
      fetchGetAllTickets({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions
  });
};

export type CreateTicketError = Fetcher.ErrorWrapper<undefined>;

export type CreateTicketVariables = {
  body?: Schemas.TicketCreateDTO;
} & TicketContext['fetcherOptions'];

export const fetchCreateTicket = (
  variables: CreateTicketVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    Schemas.TicketReadDTO,
    CreateTicketError,
    Schemas.TicketCreateDTO,
    {},
    {},
    {}
  >({ url: '/tickets', method: 'post', ...variables, signal });

export const useCreateTicket = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.TicketReadDTO,
      CreateTicketError,
      CreateTicketVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useTicketContext();
  return reactQuery.useMutation<
    Schemas.TicketReadDTO,
    CreateTicketError,
    CreateTicketVariables
  >({
    mutationFn: (variables: CreateTicketVariables) =>
      fetchCreateTicket({ ...fetcherOptions, ...variables }),
    ...options
  });
};

export type GetAllCommentsError = Fetcher.ErrorWrapper<undefined>;

export type GetAllCommentsResponse = Schemas.CommentReadDTO[];

export type GetAllCommentsVariables = TicketContext['fetcherOptions'];

export const fetchGetAllComments = (
  variables: GetAllCommentsVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    GetAllCommentsResponse,
    GetAllCommentsError,
    undefined,
    {},
    {},
    {}
  >({ url: '/comments', method: 'get', ...variables, signal });

export const useGetAllComments = <TData = GetAllCommentsResponse>(
  variables: GetAllCommentsVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      GetAllCommentsResponse,
      GetAllCommentsError,
      TData
    >,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useTicketContext(options);
  return reactQuery.useQuery<
    GetAllCommentsResponse,
    GetAllCommentsError,
    TData
  >({
    queryKey: queryKeyFn({
      path: '/comments',
      operationId: 'getAllComments',
      variables
    }),
    queryFn: ({ signal }) =>
      fetchGetAllComments({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions
  });
};

export type CreateCommentError = Fetcher.ErrorWrapper<undefined>;

export type CreateCommentVariables = {
  body?: Schemas.CommentCreateDTO;
} & TicketContext['fetcherOptions'];

export const fetchCreateComment = (
  variables: CreateCommentVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    Schemas.CommentReadDTO,
    CreateCommentError,
    Schemas.CommentCreateDTO,
    {},
    {},
    {}
  >({ url: '/comments', method: 'post', ...variables, signal });

export const useCreateComment = (
  options?: Omit<
    reactQuery.UseMutationOptions<
      Schemas.CommentReadDTO,
      CreateCommentError,
      CreateCommentVariables
    >,
    'mutationFn'
  >
) => {
  const { fetcherOptions } = useTicketContext();
  return reactQuery.useMutation<
    Schemas.CommentReadDTO,
    CreateCommentError,
    CreateCommentVariables
  >({
    mutationFn: (variables: CreateCommentVariables) =>
      fetchCreateComment({ ...fetcherOptions, ...variables }),
    ...options
  });
};

export type GetTicketByUserIdPathParams = {
  userId: string;
};

export type GetTicketByUserIdError = Fetcher.ErrorWrapper<undefined>;

export type GetTicketByUserIdResponse = Schemas.TicketReadDTO[];

export type GetTicketByUserIdVariables = {
  pathParams: GetTicketByUserIdPathParams;
} & TicketContext['fetcherOptions'];

export const fetchGetTicketByUserId = (
  variables: GetTicketByUserIdVariables,
  signal?: AbortSignal
) =>
  ticketFetch<
    GetTicketByUserIdResponse,
    GetTicketByUserIdError,
    undefined,
    {},
    {},
    GetTicketByUserIdPathParams
  >({ url: '/tickets/user/{userId}', method: 'get', ...variables, signal });

export const useGetTicketByUserId = <TData = GetTicketByUserIdResponse>(
  variables: GetTicketByUserIdVariables,
  options?: Omit<
    reactQuery.UseQueryOptions<
      GetTicketByUserIdResponse,
      GetTicketByUserIdError,
      TData
    >,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const { fetcherOptions, queryOptions, queryKeyFn } =
    useTicketContext(options);
  return reactQuery.useQuery<
    GetTicketByUserIdResponse,
    GetTicketByUserIdError,
    TData
  >({
    queryKey: queryKeyFn({
      path: '/tickets/user/{userId}',
      operationId: 'getTicketByUserId',
      variables
    }),
    queryFn: ({ signal }) =>
      fetchGetTicketByUserId({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions
  });
};

export type QueryOperation =
  | {
      path: '/tickets/{id}';
      operationId: 'getTicketById';
      variables: GetTicketByIdVariables;
    }
  | {
      path: '/comments/{id}';
      operationId: 'getCommentById';
      variables: GetCommentByIdVariables;
    }
  | {
      path: '/tickets';
      operationId: 'getAllTickets';
      variables: GetAllTicketsVariables;
    }
  | {
      path: '/comments';
      operationId: 'getAllComments';
      variables: GetAllCommentsVariables;
    }
  | {
      path: '/tickets/user/{userId}';
      operationId: 'getTicketByUserId';
      variables: GetTicketByUserIdVariables;
    };
