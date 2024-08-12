/* eslint @typescript-eslint/no-explicit-any: off */
import Axios from "axios";
import { uuid } from "uuidv4";

export const AXIOS_INSTANCE = Axios.create({ baseURL: "" });

type CustomClient<T> = (data: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  params?: Record<string, any>;
  headers?: Record<string, any>;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => Promise<T>;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData & { headers?: any };

export const useApiClient = <T>(): CustomClient<T> => {
  const token = "token"; // TODO

  return async ({ url, method, params, data }) => {
    const response = await fetch(url + new URLSearchParams(params), {
      method,
      headers: { ...data?.headers, Authorization: `Bearer ${token}`, "X-Request-Id": uuid() },
      ...(data ? { body: JSON.stringify(data) } : {}),
    });

    const json = await response.json();

    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  };
};
