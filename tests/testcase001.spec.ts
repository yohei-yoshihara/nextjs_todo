import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator('a[href="/dashboard"]').click();

  await page.locator('input[name="username"]').fill("user1");
  await page.locator('input[name="password"]').fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole('heading', { name: 'user1のタスク' })).toBeVisible();
});
