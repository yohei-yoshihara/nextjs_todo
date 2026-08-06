import { test, expect } from "@playwright/test";

test("login user1", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator('a[href="/dashboard"]').click();

  await page.locator('input[name="username"]').fill("user1");
  await page.locator('input[name="password"]').fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole('heading', { name: 'user1のタスク' })).toBeVisible();
});

test("login user2", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator('a[href="/dashboard"]').click();

  await page.locator('input[name="username"]').fill("user2");
  await page.locator('input[name="password"]').fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole('heading', { name: 'user2のタスク' })).toBeVisible();
});

test("login wrong user", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator('a[href="/dashboard"]').click();

  await page.locator('input[name="username"]').fill("xxx");
  await page.locator('input[name="password"]').fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test("login wrong password", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator('a[href="/dashboard"]').click();

  await page.locator('input[name="username"]').fill("user1");
  await page.locator('input[name="password"]').fill("xxx");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test("login logout", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.locator('a[href="/dashboard"]').click();

  await page.locator('input[name="username"]').fill("user1");
  await page.locator('input[name="password"]').fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole('heading', { name: 'user1のタスク' })).toBeVisible();

  await page.locator('button#logout').click();

  await expect(page.getByRole('heading', { name: 'ようこそ' })).toBeVisible();
});

