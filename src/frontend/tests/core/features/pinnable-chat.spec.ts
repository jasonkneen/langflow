import { expect, test } from "@playwright/test";
import { awaitBootstrapTest } from "../../utils/await-bootstrap-test";

test("pinnable chat functionality", { tag: ["@release"] }, async ({ page }) => {
  await awaitBootstrapTest(page);

  // Test initial unpinned state
  await page.getByTestId("chat-modal").isVisible();
  await expect(page.getByTestId("chat-modal")).not.toHaveClass(/pinned/);

  // Test pin button visibility and click
  await page.getByTestId("pin-chat-button").click();
  await expect(page.getByTestId("chat-modal")).toHaveClass(/pinned/);

  // Test chat functionality while pinned
  await page.getByTestId("input-chat-playground").fill("test message");
  await page.keyboard.press("Enter");
  await expect(
    page.getByTestId("chat-message-User-test message"),
  ).toBeVisible();

  // Test flow interaction while chat is pinned
  await page.getByTestId("flow-page").click();
  await expect(page.getByTestId("chat-modal")).toBeVisible();

  // Test unpin
  await page.getByTestId("pin-chat-button").click();
  await expect(page.getByTestId("chat-modal")).not.toHaveClass(/pinned/);
});

test("chat layout changes", { tag: ["@release"] }, async ({ page }) => {
  await awaitBootstrapTest(page);

  // Test flow container margin when chat is pinned
  await page.getByTestId("pin-chat-button").click();
  await expect(page.getByTestId("flow-page")).toHaveClass(/mr-\[690px\]/);

  // Test flow container margin when chat is unpinned
  await page.getByTestId("pin-chat-button").click();
  await expect(page.getByTestId("flow-page")).not.toHaveClass(/mr-\[690px\]/);
});

test("chat pin state persistence", { tag: ["@release"] }, async ({ page }) => {
  await awaitBootstrapTest(page);

  // Pin chat and navigate away
  await page.getByTestId("pin-chat-button").click();
  await page.getByTestId("flows-page-link").click();

  // Return and verify state is preserved
  await page.getByTestId("playground-link").click();
  await expect(page.getByTestId("chat-modal")).toHaveClass(/pinned/);
});
