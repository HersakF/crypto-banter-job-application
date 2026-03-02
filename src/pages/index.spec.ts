import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import type { AppChallenge } from "@/types/app/challenge";
import HomeIndex from "@/pages/index.vue";
import { challengeItem } from "@test/fixtures/challenge";

vi.mock("@/composables/api/useApi", () => ({
  useApi: vi.fn(),
}));

vi.mock("@/composables/api/useApiExchange", () => ({
  useApiExchange: vi.fn(),
}));

const { useApi } = await import("@/composables/api/useApi");
const { useApiExchange } = await import("@/composables/api/useApiExchange");

describe("HomeIndex", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useApiExchange).mockReturnValue({
      exchangeError: ref(null),
      exchangeLoading: ref(false),
      exchangeMessage: ref(""),
      hasCompletedFirstNext: ref(false),
      runFirstNext: vi.fn().mockResolvedValue(undefined),
      retry: vi.fn().mockResolvedValue(undefined),
    });
  });

  it("shows loading when useApi loading is true", () => {
    vi.mocked(useApi).mockReturnValue({
      data: ref(null),
      loading: ref(true),
      error: ref(null),
      refresh: vi.fn(),
      onRequestGet: vi.fn(),
      onRequestPost: vi.fn(),
      onRequestPut: vi.fn(),
      onRequestDelete: vi.fn(),
    });

    const wrapper = mount(HomeIndex);
    expect(wrapper.text()).toContain("Loading challenges...");
  });

  it("shows error when useApi error is set", async () => {
    vi.mocked(useApi).mockReturnValue({
      data: ref(null),
      loading: ref(false),
      error: ref({ status: 500, message: "Request failed" }),
      refresh: vi.fn(),
      onRequestGet: vi.fn(),
      onRequestPost: vi.fn(),
      onRequestPut: vi.fn(),
      onRequestDelete: vi.fn(),
    });

    const wrapper = mount(HomeIndex);
    await flushPromises();
    expect(wrapper.text()).toContain("Request failed");
  });

  it("shows challenges when data is loaded", async () => {
    const dataRef = ref<AppChallenge[] | null>(null);
    vi.mocked(useApi).mockReturnValue({
      data: dataRef,
      loading: ref(false),
      error: ref(null),
      refresh: vi.fn(),
      onRequestGet: vi.fn(),
      onRequestPost: vi.fn(),
      onRequestPut: vi.fn(),
      onRequestDelete: vi.fn(),
    });

    const wrapper = mount(HomeIndex);
    dataRef.value = [challengeItem];
    await flushPromises();
    expect(wrapper.text()).toContain("Challenges");
    expect(wrapper.text()).toContain("Challenge title");
  });
});
