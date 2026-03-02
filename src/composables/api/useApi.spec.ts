import { describe, it, expect, vi, beforeEach } from "vitest";
import { useApi } from "@/composables/api/useApi";

vi.mock("@/services/api", () => ({
  fakeApi: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const { fakeApi } = await import("@/services/api");

describe("useApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("onRequestGet success sets data and clears error", async () => {
    const mockData = { id: 1, name: "test" };
    
    vi.mocked(fakeApi.get).mockResolvedValue({
      data: mockData,
      status: 200,
      message: "OK",
    });

    const { data, loading, error, onRequestGet } = useApi<{ id: number; name: string }>();

    expect(loading.value).toBe(false);

    const promise = onRequestGet("/api/test");

    expect(loading.value).toBe(true);

    await promise;

    expect(loading.value).toBe(false);
    expect(data.value).toEqual(mockData);
    expect(error.value).toBe(null);
  });

  it("onRequestGet error sets error and leaves data null", async () => {
    vi.mocked(fakeApi.get).mockResolvedValue({
      status: 404,
      message: "Not Found",
    });

    const { data, loading, error, onRequestGet } = useApi<unknown>();

    await onRequestGet("/api/missing");

    expect(loading.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toEqual({ status: 404, message: "Not Found" });
  });

  it("onRequestGet throw sets error with message", async () => {
    vi.mocked(fakeApi.get).mockRejectedValue(new Error("Network error"));

    const { data, error, onRequestGet } = useApi<unknown>();

    await onRequestGet("/api/fail");

    expect(data.value).toBe(null);
    expect(error.value).toEqual({ status: 500, message: "Network error" });
  });

  it("refresh re-runs last GET request", async () => {
    const mockData = { id: 1 };

    vi.mocked(fakeApi.get)
      .mockResolvedValueOnce({ data: mockData, status: 200, message: "OK" })
      .mockResolvedValueOnce({ data: { id: 2 }, status: 200, message: "OK" });

    const { data, refresh, onRequestGet } = useApi<{ id: number }>();

    await onRequestGet("/api/test");

    expect(data.value).toEqual({ id: 1 });

    await refresh();

    expect(data.value).toEqual({ id: 2 });
    expect(fakeApi.get).toHaveBeenCalledTimes(2);
  });

  it("refresh does nothing when no previous request", async () => {
    const { data, refresh } = useApi<unknown>();

    await refresh();

    expect(data.value).toBe(null);
    expect(fakeApi.get).not.toHaveBeenCalled();
  });
});
