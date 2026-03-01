import type { ApiResponseError } from "@/types/api/response/error";
import type { ApiResponseSuccess } from "@/types/api/response/success";

function randomDelay(minMs: number, maxMs: number): Promise<void> {
  const duration = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export async function exchangeGet(): Promise<
  ApiResponseSuccess<null> | ApiResponseError
> {
  await randomDelay(1000, 2000);

  const isSuccess = Math.random() < 0.5;

  if (isSuccess) {
    return {
      data: null,
      status: 200,
      message: "OK",
    } satisfies ApiResponseSuccess<null>;
  }

  return {
    status: 500,
    message: "Exchange failed",
  } satisfies ApiResponseError;
}

export const exchangeApi = {
  get: exchangeGet,
};
