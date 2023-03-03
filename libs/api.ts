import fetcher from "./fetcher";

const BASE_API_URL = process.env.BASE_URL;

// keys for SWR
export const GET_PATHS = {};

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
}

const client = new Client();

export { client };
