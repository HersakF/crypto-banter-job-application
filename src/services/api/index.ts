import { challenges } from "@/mock/challenges";
import type { ApiResponseError } from "@/types/api/response/error";
import type { ApiResponseSuccess } from "@/types/api/response/success";

type RouteParams = Record<string, string | number>;
type RouteHandler<T> = (options: {
  params?: RouteParams;
  body?: unknown;
}) => Promise<T>;

type RouteKey = string;

const routes = new Map<RouteKey, RouteHandler<unknown>>();

function routeKey(method: string, path: string): RouteKey {
  return `${method} ${path}`;
}

function randomDelay(minMs: number, maxMs: number): Promise<void> {
  const duration = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, duration));
}

routes.set(routeKey("GET", "/api/v1/challenges"), async () => {
  return challenges;
});

async function request<T>(
  method: string,
  path: string,
  options?: { params?: RouteParams; body?: unknown }
): Promise<ApiResponseSuccess<T> | ApiResponseError> {
  await randomDelay(1000, 2000);

  const key = routeKey(method, path);
  const handler = routes.get(key) as RouteHandler<T> | undefined;

  if (!handler) {
    return {
      status: 404,
      message: "Not Found",
    } satisfies ApiResponseError;
  }

  try {
    const data = await handler({
      params: options?.params,
      body: options?.body,
    });
    return {
      data,
      status: 200,
      message: "OK",
    } satisfies ApiResponseSuccess<T>;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return {
      status: 500,
      message,
    } satisfies ApiResponseError;
  }
}

export const fakeApi = {
  get<T>(
    path: string,
    params?: RouteParams
  ): Promise<ApiResponseSuccess<T> | ApiResponseError> {
    return request<T>("GET", path, { params });
  },

  post<T>(
    path: string,
    body?: unknown
  ): Promise<ApiResponseSuccess<T> | ApiResponseError> {
    return request<T>("POST", path, { body });
  },

  put<T>(
    path: string,
    body?: unknown
  ): Promise<ApiResponseSuccess<T> | ApiResponseError> {
    return request<T>("PUT", path, { body });
  },

  delete<T>(
    path: string,
    params?: RouteParams
  ): Promise<ApiResponseSuccess<T> | ApiResponseError> {
    return request<T>("DELETE", path, { params });
  },
};
