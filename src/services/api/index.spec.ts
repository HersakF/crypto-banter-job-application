import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fakeApi } from "@/services/api";
import type { AppChallenge } from "@/types/app/challenge";

describe("fakeApi", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("GET /api/v1/challenges returns challenges data", async () => {
    const promise = fakeApi.get<AppChallenge[]>("/api/v1/challenges");
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toHaveProperty("data");

    if ("data" in result && result.data !== null) {
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.status).toBe(200);
    }
  });

  it("GET unknown path returns 404", async () => {
    const promise = fakeApi.get("/api/v1/unknown");
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).not.toHaveProperty("data");
    
    if ("status" in result) {
      expect(result.status).toBe(404);
      expect(result.message).toBe("Not Found");
    }
  });
});
