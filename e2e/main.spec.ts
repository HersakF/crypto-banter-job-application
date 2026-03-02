import { test, expect } from "@playwright/test";

test.describe("Main screen", () => {
  test("renders challenges returned from API", async ({ page }) => {
    await page.route("**/api/v1/challenges", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            title: "Super challenge",
            description: "Test description",
            duration: "5 days",
            is_active: false,
            is_completed: false,
            created_at: "2025-01-01T00:00:00Z",
            updated_at: "2025-01-01T00:00:00Z",
            days: [],
          },
        ]),
      });
    });
    
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /challenges/i })
    ).toBeVisible();

    const challengeHeading = page.getByRole("heading", {
      name: "Super challenge",
    });

    await expect(challengeHeading).toBeVisible();
  });

  test("shows empty state when API returns no challenges", async ({ page }) => {
    await page.route("**/api/v1/challenges", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Super challenge" })
    ).not.toBeVisible();
  });
});
