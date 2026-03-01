// Vue
import { ref } from "vue";

// Api
import { fakeApi } from "@/services/api";

// Types
import type { ApiResponseError } from "@/types/api/response/error";
import type { Ref } from "vue";


type RouteParams = Record<string, string | number>;
type LastRequest =
  | { method: "GET"; path: string; params?: RouteParams }
  | { method: "POST"; path: string; body?: unknown }
  | { method: "PUT"; path: string; body?: unknown }
  | { method: "DELETE"; path: string; params?: RouteParams };

function isSuccessResponse<T>(
  response: { data?: T } | ApiResponseError
): response is { data: T; status: number; message: string } {
  return "data" in response && response.data !== undefined;
}

export function useApi<T>() {
  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref(false);
  const error = ref<ApiResponseError | null>(null);

  let lastRequest: LastRequest | null = null;

  async function runRequest(
    requestFn: () => Promise<{ data?: T } | ApiResponseError>
  ): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const response = await requestFn();

      if (isSuccessResponse<T>(response)) {
        data.value = response.data;
      } else {
        error.value = response as ApiResponseError;
      }
    } catch (err) {
      error.value = {
        status: 500,
        message:
          err instanceof Error ? err.message : "Request failed",
      };
    } finally {
      loading.value = false;
    }
  }

  async function refresh(): Promise<void> {
    if (!lastRequest) {
      return;
    }

    switch (lastRequest.method) {
      case "GET": {
        const { path, params } = lastRequest;
        await runRequest(() => fakeApi.get<T>(path, params));
        break;
      }
      case "POST": {
        const { path, body } = lastRequest;
        await runRequest(() => fakeApi.post<T>(path, body));
        break;
      }
      case "PUT": {
        const { path, body } = lastRequest;
        await runRequest(() => fakeApi.put<T>(path, body));
        break;
      }
      case "DELETE": {
        const { path, params } = lastRequest;
        await runRequest(() => fakeApi.delete<T>(path, params));
        break;
      }
    }
  }

  async function onRequestGet(
    path: string,
    params?: RouteParams
  ): Promise<void> {
    lastRequest = { method: "GET", path, params };
    await runRequest(() => fakeApi.get<T>(path, params));
  }

  async function onRequestPost(path: string, body?: unknown): Promise<void> {
    lastRequest = { method: "POST", path, body };
    await runRequest(() => fakeApi.post<T>(path, body));
  }

  async function onRequestPut(path: string, body?: unknown): Promise<void> {
    lastRequest = { method: "PUT", path, body };
    await runRequest(() => fakeApi.put<T>(path, body));
  }

  async function onRequestDelete(
    path: string,
    params?: RouteParams
  ): Promise<void> {
    lastRequest = { method: "DELETE", path, params };
    await runRequest(() => fakeApi.delete<T>(path, params));
  }

  return {
    data,
    loading,
    error,
    refresh,
    onRequestGet,
    onRequestPost,
    onRequestPut,
    onRequestDelete,
  };
}
