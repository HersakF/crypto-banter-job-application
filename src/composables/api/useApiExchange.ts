// Vue
import { ref } from "vue";

// Types
import type { ApiResponseError } from "@/types/api/response/error";

// Api
import { exchangeApi } from "@/services/api-exchange";

type SetNextTaskFn = (challengeIndex: number, dayIndex: number) => void;

function isSuccessResponse(
  response: ApiResponseError | { data: null; status: number; message: string }
): response is { data: null; status: number; message: string } {
  return "data" in response;
}

const EXCHANGE_LOADING_MESSAGE = "Exchanging...";
const EXCHANGE_RETRY_MESSAGE = "Retrying...";

export function useApiExchange(setNextTask: SetNextTaskFn) {
  const exchangeError = ref<ApiResponseError | null>(null);
  const exchangeLoading = ref(false);
  const exchangeMessage = ref("");
  const hasCompletedFirstNext = ref(false);
  const pendingChallengeIndex = ref(0);
  const pendingDayIndex = ref(0);

  async function runFirstNext(
    challengeIndex: number,
    dayIndex: number
  ): Promise<void> {
    const isRetry = exchangeError.value !== null;
    exchangeMessage.value = isRetry ? EXCHANGE_RETRY_MESSAGE : EXCHANGE_LOADING_MESSAGE;
    exchangeError.value = null;
    exchangeLoading.value = true;

    try {
      const response = await exchangeApi.get();

      if (isSuccessResponse(response)) {
        hasCompletedFirstNext.value = true;
        exchangeError.value = null;
        setNextTask(challengeIndex, dayIndex);
      } else {
        pendingChallengeIndex.value = challengeIndex;
        pendingDayIndex.value = dayIndex;
        exchangeError.value = response;
      }
    } finally {
      exchangeLoading.value = false;
      exchangeMessage.value = "";
    }
  }

  async function retry(): Promise<void> {
    await runFirstNext(
      pendingChallengeIndex.value,
      pendingDayIndex.value
    );
  }

  return {
    exchangeError,
    exchangeLoading,
    exchangeMessage,
    hasCompletedFirstNext,
    runFirstNext,
    retry,
  };
}
