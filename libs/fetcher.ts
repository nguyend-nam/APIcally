import fetch from "isomorphic-unfetch";

export type FetcherError = Error & { response: Response };

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  if (res.ok) {
    return res.json();
  }

  // Parse error from the response
  const detailError = await res.json().then((res) => res?.message);
  // error.message = detailError || error.message;

  return Promise.reject(detailError);
}
