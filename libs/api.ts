import fetcher from "./fetcher";
import FormData from "form-data";
import {
  BaseResponse,
  CheckTokenResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectDetailByOwnerIdAndAliasResponse,
  GetProjectsInCartResponse,
  GetSubscribedProjectsResponse,
  GetTokenResponse,
  RateProjectRequest,
  ScanAllProjectsResponse,
  UserInfoData,
} from "./types";

const AUTH_BASE_API_URL =
  process.env.AUTH_BASE_API_URL || "http://localhost:4000";
const API_BASE_API_URL =
  process.env.API_BASE_API_URL || "http://localhost:3001";
const PYTHON_BASE_API_URL = process.env.PYTHON_BASE_API_URL;

export interface GetAllProjectsParams {
  name: string;
  alias: string;
  description: string;
  documentation: string;
  input: string;
  subscribeCost: number;
  costPerRequest: number;
}

export interface AuthResponse {
  access_token: string;
  refesh_token: string;
}

// keys for SWR
export const GET_PATHS = {
  CREATE_PROJECTS: (ownerId: string) => `/${ownerId}/post/project`,
  GET_PROJECTS_BY_OWNER: (ownerId: string) => `/${ownerId}/get/projects`,
  GET_PROJECT_BY_ALIAS: (ownerId: string, alias: string) =>
    `/${ownerId}/get/project/${alias}`,
  UPLOAD_PROJECT_FILES: (ownerId: string) => `/${ownerId}/post/project/upload`,
  SCAN_ALL_PROJECTS: "projects/no-auth",
  SCAN_OWNED_PROJECTS_BY_USER: (ownerId: string) =>
    `projects/no-auth/${ownerId}`,
  GET_SUBSCRIBED_PROJECTS: "projects/subscribed",
  GET_PROJECT_DETAIL_OWNERID_ALIAS: (ownerId: string, alias: string) =>
    `project/detail/${ownerId}/${alias}`,
  GET_USER_INFO: (ownerId: string) => `user-info/${ownerId}`,
  GET_PROJECTS_IN_CART: "projects/cart",
};

class Client {
  headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  privateHeaders: HeadersInit = {
    ...this.headers,
  };

  public setAuthToken(token: string) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  public clearAuthToken() {
    this.privateHeaders = { ...this.headers };
  }

  public login(username: string, password: string) {
    return fetcher<GetTokenResponse>(`${AUTH_BASE_API_URL}/v1/auth`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ username, password }),
    });
  }

  public register(username: string, password: string) {
    return fetcher<BaseResponse<string>>(`${AUTH_BASE_API_URL}/v1/register`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ username, password }),
    });
  }

  public refreshToken(refreshToken: string) {
    return fetcher<GetTokenResponse>(`${AUTH_BASE_API_URL}/v1/refresh`, {
      method: "POST",
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify({ refreshToken }),
    });
  }

  public validateAccessToken() {
    return fetcher<CheckTokenResponse>(`${AUTH_BASE_API_URL}/v1/check`, {
      method: "POST",
      headers: {
        ...this.privateHeaders,
      },
    });
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return fetcher<BaseResponse<string>>(`${AUTH_BASE_API_URL}/v1/auth`, {
      method: "PATCH",
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }

  public topUp(amount: number) {
    return fetcher<BaseResponse<number>>(`${AUTH_BASE_API_URL}/v1/balance`, {
      method: "POST",
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify({ amount }),
    });
  }

  public scanAllProjects() {
    return fetcher<ScanAllProjectsResponse>(`${API_BASE_API_URL}/no-auth`, {
      headers: {
        ...this.headers,
      },
    });
  }

  public scanOnwedProjectsOfUser(ownerId: string) {
    return fetcher<ScanAllProjectsResponse>(
      `${API_BASE_API_URL}/no-auth/${ownerId}`,
      {
        headers: {
          ...this.headers,
        },
      }
    );
  }

  public getSubscribedProjects() {
    return fetcher<GetSubscribedProjectsResponse>(
      `${API_BASE_API_URL}/v1/subscribe`,
      {
        headers: {
          ...this.privateHeaders,
        },
      }
    );
  }

  public createProject(params: CreateProjectRequest) {
    return fetcher<CreateProjectResponse>(`${API_BASE_API_URL}/v1/`, {
      method: "POST",
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(params),
    });
  }

  public rateProject(
    ownerId: string,
    alias: string,
    params: RateProjectRequest
  ) {
    return fetcher<BaseResponse<any>>(
      `${API_BASE_API_URL}/v1/rating/${ownerId}/${alias}`,
      {
        method: "POST",
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(params),
      }
    );
  }

  public getProjectDetailByOwnerIdAndAlias(ownerId: string, alias: string) {
    return fetcher<GetProjectDetailByOwnerIdAndAliasResponse>(
      `${API_BASE_API_URL}/no-auth/${ownerId}/${alias}`,
      {
        headers: {
          ...this.headers,
        },
      }
    );
  }

  public getUserInfo(ownerId: string) {
    return fetcher<BaseResponse<UserInfoData>>(
      `${API_BASE_API_URL}/no-auth/profile/info/${ownerId}`,
      {
        headers: {
          ...this.headers,
        },
      }
    );
  }

  public getUserProfile() {
    return fetcher<BaseResponse<UserInfoData>>(
      `${API_BASE_API_URL}/v1/profile`,
      {
        headers: {
          ...this.privateHeaders,
        },
      }
    );
  }

  public getUserBalance() {
    return fetcher<BaseResponse<number>>(`${AUTH_BASE_API_URL}/v1/balance`, {
      headers: {
        ...this.privateHeaders,
      },
    });
  }

  public getProjectsInCart() {
    return fetcher<GetProjectsInCartResponse>(`${API_BASE_API_URL}/v1/cart`, {
      headers: {
        ...this.privateHeaders,
      },
    });
  }

  /////
  public getProjectByAlias(alias: string) {
    return fetcher<any>(`${PYTHON_BASE_API_URL}/${alias}`, {
      headers: {
        ...this.privateHeaders,
      },
    });
  }

  public async uploadProjectFiles(alias: string, files: FormData) {
    console.log(this.privateHeaders);
    return await fetcher<any>(`${PYTHON_BASE_API_URL}/${alias}/upload`, {
      method: "POST",
      headers: this.privateHeaders,
      // @ts-ignore
      body: files,
      redirect: "follow",
      mode: "no-cors",
    });
  }
}

const client = new Client();

export { client };
