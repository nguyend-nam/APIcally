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

export interface APIProjectItem {
  documentation: string;
  description: string;
  ownerId: string;
  input: string;
  createdAt: number;
  name: string;
  alias: string;
  id: string;
  subscribeCost: number;
  costPerRequest: number;
  category: string;
  fileNames: string[];
  updatedAt: number;
  stars: number;
  subscriber: number;
}

export interface ScanAllProjectsResponse
  extends BaseResponse<APIProjectItem[]> {}

export interface GetSubscribedProjectsResponse
  extends BaseResponse<APIProjectItem[]> {}
