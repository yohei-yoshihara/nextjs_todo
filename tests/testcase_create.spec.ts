import { test, expect } from "@playwright/test";

test("create new task", async ({ page }) => {
  const uniqueId = crypto.randomUUID();

  // user1としてログイン
  await page.goto("http://localhost:3000/");
  await page.locator('a[href="/dashboard"]').click();
  await page.locator('input[name="username"]').fill("user1");
  await page.locator('input[name="password"]').fill("password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole('heading', { name: 'user1のタスク' })).toBeVisible();
  
  await page.getByRole("button", { name: "新しいタスクの作成" }).click();

  // 新規タスク作成画面
  await expect(page.getByRole('heading', { name: 'タスクの作成' })).toBeVisible();
  await page.locator('input[name="title"]').fill(`テストタスク${uniqueId}`);
  await page.locator('textarea[name="description"]').fill(`テストタスク${uniqueId}の説明`);
  await page.locator('input[name="completed"]').check();
  await page.locator('select[name="userId"]').selectOption({label: "user1"});

  await page.getByRole("button", { name: "タスクの作成" }).click();

  // タスク一覧へ
  await expect(page.getByRole('heading', { name: 'user1のタスク' })).toBeVisible();
  await page.locator('li').filter({ has: page.locator(`p:has-text("テストタスク${uniqueId}")`) }).locator('a[href*="/edit"]').first().click();

  // タスク編集画面
  await expect(page.getByRole('heading', { name: 'タスクの編集' })).toBeVisible();
  await expect(page.locator('input[name="title"]')).toHaveValue(`テストタスク${uniqueId}`);
  await expect(page.locator('textarea[name="description"]')).toHaveValue(`テストタスク${uniqueId}の説明`);
  await expect(page.locator('input[name="completed"]')).toBeAttached();
  await expect(page.locator('select[name="userId"] option:checked')).toHaveText("user1");

  // タイトルと説明を更新する
  await page.locator('input[name="title"]').fill(`テストタスク${uniqueId}-2`);
  await page.locator('textarea[name="description"]').fill(`テストタスク${uniqueId}の説明-2`);
  await page.getByRole('button', { name: 'タスクの更新' }).click();

  // タスク一覧へ
  await expect(page.getByRole('heading', { name: 'user1のタスク' })).toBeVisible();
  await page.locator('li').filter({ has: page.locator(`p:has-text("テストタスク${uniqueId}-2")`) }).locator('a[href*="/edit"]').first().click();

  // タスク編集画面で更新されていることを確認する
  await expect(page.getByRole('heading', { name: 'タスクの編集' })).toBeVisible();
  await expect(page.locator('input[name="title"]')).toHaveValue(`テストタスク${uniqueId}-2`);
  await expect(page.locator('textarea[name="description"]')).toHaveValue(`テストタスク${uniqueId}の説明-2`);

  await page.goBack();

  // タスクの削除
  await page.locator('li').filter({ has: page.locator(`p:has-text("テストタスク${uniqueId}")`) }).getByRole("button", { name: "タスクの削除" }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('li').filter({ has: page.locator(`p:has-text("テストタスク${uniqueId}")`) })).not.toBeVisible();
});
