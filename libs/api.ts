import fetcher from "./fetcher";

const BASE_API_URL =
  process.env.BASE_URL || "https://develop-api.konvoykegs.com/api";

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

  public login(email: string, password: string) {
    return fetcher<any>(`${BASE_API_URL}/login_check`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ username: email, password }),
    });
  }
}

const client = new Client();

export { client };
