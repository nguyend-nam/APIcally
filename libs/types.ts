export interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface BaseErrorResponse {
  errorId: string;
  message: string;
}

export interface GetTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
}

export interface CheckTokenData {
  username: string;
}

export interface CheckTokenResponse extends BaseResponse<CheckTokenData> {}
