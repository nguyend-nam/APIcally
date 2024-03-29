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
  isAddedToCart?: boolean;
  expiredDate?: number;
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
  isAddedToCart?: boolean;
  expiredDate?: number;
  stars?: number;
  project: APIProjectItem;
  yourRate: number;
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

export interface SubscribeToAProjectResponseData {
  expiredDate: number;
  executionToken: string;
}

export interface RemoveProjectFromCartResponseDataItem {
  days: number;
  apiId: string;
  username: string;
}

export interface GetProjectFilesContentResponse {
  content: string;
  filenames: string[];
}

export interface GetBalanceLogData {
  date?: number;
  time?: string;
  amount: number;
  id?: string;
  message?: string;
  subject: string;
  balance?: number;
}

export interface ProjectSubscriberData {
  expiredDate: number;
  username: string;
}

export interface GetProjectSubscriberResponse
  extends BaseResponse<ProjectSubscriberData[]> {}

export interface GetExecutionTokenResponse extends BaseResponse<string> {}
