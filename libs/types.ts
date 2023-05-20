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

export interface CreateProjectRequest {
  name: string;
  alias: string;
  description: string;
  documentation: string;
  input: string;
  subscribeCost: number;
  costPerRequest: number;
  category: string;
}

export interface CreateProjectResponseData {
  id: string;
  ownerId: string;
  alias: string;
  description: string;
  name: string;
  input: string;
  documentation: string;
  fileNames: string[];
  createdAt: number;
  updatedAt: number;
  costPerRequest: number;
  subscribeCost: number;
  category: string;
}

export interface CreateProjectResponse
  extends BaseResponse<CreateProjectResponseData> {}

export interface RateProjectRequest {
  stars: number;
}

export interface GetProjectDetailByOwnerIdAndAliasResponseData {
  subscriber?: number;
  stars?: number;
  project: Project;
}

export interface Project {
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
}

export interface GetProjectDetailByOwnerIdAndAliasResponse
  extends BaseResponse<GetProjectDetailByOwnerIdAndAliasResponseData> {}

export interface UserInfoData {
  username: string;
  owned: number;
  subscribed: number;
  bestRate: BestRate;
}

export interface BestRate {
  stars: number;
  alias: string;
}
export interface ProjectInCartItem {
  days: number;
  apiId: string;
  username: string;
  price: number;
  total: number;
}

export interface GetProjectsInCartResponse
  extends BaseResponse<ProjectInCartItem[]> {}
