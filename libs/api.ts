import fetcher from "./fetcher";
import FormData from "form-data";

const BASE_API_URL = process.env.BASE_API_URL;
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

// keys for SWR
export const GET_PATHS = {
  CREATE_PROJECTS: (ownerId: string) => `/${ownerId}/post/project`,
  GET_PROJECTS_BY_OWNER: (ownerId: string) => `/${ownerId}/get/projects`,
  GET_PROJECT_BY_ALIAS: (ownerId: string, alias: string) =>
    `/${ownerId}/get/project/${alias}`,
  UPLOAD_PROJECT_FILES: (ownerId: string) => `/${ownerId}/post/project/upload`,
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
    return fetcher<any>(`${BASE_API_URL}/authenticate`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ username, password }),
    });
  }

  public createProject(ownerId: string, params: GetAllProjectsParams) {
    return fetcher<any>(`${PYTHON_BASE_API_URL}/${ownerId}`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify(params),
    });
  }

  public getProjects(ownerId: string) {
    return fetcher<any>(`${PYTHON_BASE_API_URL}/${ownerId}`, {
      headers: {
        ...this.headers,
      },
    });
  }

  public getProjectByAlias(ownerId: string, alias: string) {
    return fetcher<any>(`${PYTHON_BASE_API_URL}/${ownerId}/${alias}`, {
      headers: {
        ...this.headers,
      },
    });
  }

  public uploadProjectFiles(ownerId: string, alias: string, files: FormData) {
    return fetcher<any>(`${PYTHON_BASE_API_URL}/${ownerId}/${alias}/upload`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      // @ts-ignore
      body: files,
      redirect: "follow",
      mode: "no-cors",
    });
  }
}

const client = new Client();

export { client };
