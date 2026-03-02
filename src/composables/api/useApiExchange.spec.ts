import { describe, it, expect, vi, beforeEach } from "vitest";
import { useApiExchange } from "@/composables/api/useApiExchange";

vi.mock("@/services/api-exchange", () => ({
  exchangeApi: {
    get: vi.fn(),
  },
}));

const { exchangeApi } = await import("@/services/api-exchange");

describe("useApiExchange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("runFirstNext on success sets hasCompletedFirstNext and calls setNextTask", async () => {
    vi.mocked(exchangeApi.get).mockResolvedValue({
      data: null,
      status: 200,
      message: "OK",
    });

    const setNextTask = vi.fn<(challengeIndex: number, dayIndex: number) => void>();
    const { hasCompletedFirstNext, runFirstNext } = useApiExchange(setNextTask);

    expect(hasCompletedFirstNext.value).toBe(false);

    await runFirstNext(1, 2);

    expect(hasCompletedFirstNext.value).toBe(true);
    expect(setNextTask).toHaveBeenCalledWith(1, 2);
  });

  it("runFirstNext on failure sets exchangeError and pending indices", async () => {
    vi.mocked(exchangeApi.get).mockResolvedValue({
      status: 500,
      message: "Exchange failed",
    });

    const setNextTask = vi.fn<(challengeIndex: number, dayIndex: number) => void>();
    const { exchangeError, runFirstNext } = useApiExchange(setNextTask);

    await runFirstNext(0, 1);

    expect(exchangeError.value).toEqual({ status: 500, message: "Exchange failed" });
    expect(setNextTask).not.toHaveBeenCalled();
  });

  it("retry calls runFirstNext with pending indices after failure", async () => {
    vi.mocked(exchangeApi.get)
      .mockResolvedValueOnce({ status: 500, message: "Exchange failed" })
      .mockResolvedValueOnce({ data: null, status: 200, message: "OK" });

    const setNextTask = vi.fn<(challengeIndex: number, dayIndex: number) => void>();
    const { exchangeError, hasCompletedFirstNext, retry, runFirstNext } =
      useApiExchange(setNextTask);

    await runFirstNext(2, 3);
    expect(exchangeError.value).not.toBe(null);

    await retry();

    expect(hasCompletedFirstNext.value).toBe(true);
    expect(setNextTask).toHaveBeenCalledWith(2, 3);
  });
});
