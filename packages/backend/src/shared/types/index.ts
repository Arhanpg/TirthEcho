export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
    hasMore?: boolean;
  };
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  skip: number;
}

export interface UserPayload {
  uuid: string;
  role: string;
  mobile: string;
}

export interface JwtPayload {
  uuid: string;
  role: string;
  iat: number;
  exp: number;
}

export class CustomError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
