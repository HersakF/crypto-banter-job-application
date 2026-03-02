import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { exchangeApi } from "@/services/api-exchange";

describe("exchangeApi", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("get returns success response when Math.random < 0.5", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.3);

    const promise = exchangeApi.get();
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("status", 200);
    expect(result).toHaveProperty("message", "OK");
    
    if ("data" in result) {
      expect(result.data).toBe(null);
    }
  });

  it("get returns error response when Math.random >= 0.5", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.7);

    const promise = exchangeApi.get();
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).not.toHaveProperty("data");
    expect(result).toHaveProperty("status", 500);
    expect(result).toHaveProperty("message", "Exchange failed");
  });
});
