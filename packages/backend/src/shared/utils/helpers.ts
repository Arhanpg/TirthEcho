export function getPaginationOffset(page: number, pageSize: number) {
  return (page - 1) * pageSize;
}

export function formatApiResponse<T>(success: boolean, data?: T, message?: string) {
  return {
    success,
    data,
    message,
  };
}

export function formatPaginatedResponse<T>(
  success: boolean,
  data: T[],
  total: number,
  page: number,
  pageSize: number
) {
  return {
    success,
    data,
    meta: {
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total,
    },
  };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
