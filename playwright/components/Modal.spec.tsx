// Node modules
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-modal/FormPage";

const button1 = "Open Guiness modal";
const button2 = "Open PC-Engine modal";
const buttonClose = "Close";
const dialogBackgroundPosition = { position: { x: 0, y: 0 } }; // this is the top left part of the screen covered by the modal background
const textCleanup = "Text to clean Playwright selector";
const title1 = "About Guiness!";
const title2 = "I am a the PC-Engine modal!";
let form: MountResult;

test.beforeEach(async ({ mount }) => {
  form = await mount(<FormPage />);
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(form).toHaveScreenshot();
});

test("1. Should be able to open and close the first modal", async () => {
  await test.step("Open modal", async () => {
    // Act
    await form.getByRole("button", { name: button1 }).click();

    // Assert
    await expect(form.getByRole("heading", { name: title1 })).toBeVisible();
    await expect(form.getByRole("button", { name: buttonClose })).toBeVisible();
  });

  await test.step("Close modal", async () => {
    // Act
    await form.getByRole("button", { name: buttonClose }).click();

    // Assert
    await expect(form.getByRole("heading", { name: title1 })).not.toBeVisible();
    await expect(form.getByRole("button", { name: buttonClose })).not.toBeVisible();
  });
});

test("2. Should be able to open and close the second modal", async () => {
  await test.step("Open modal", async () => {
    // Act
    await form.getByRole("button", { name: button2 }).click();

    // Assert
    await expect(form.getByRole("heading", { name: title2 })).toBeVisible();
    await expect(form.getByRole("button", { name: buttonClose })).toBeVisible();
  });

  await test.step("Close modal", async () => {
    // Act
    await form.getByRole("button", { name: buttonClose }).click();

    // Assert
    await expect(form.getByRole("heading", { name: title2 })).not.toBeVisible();
    await expect(form.getByRole("button", { name: buttonClose })).not.toBeVisible();
  });
});

test("3. Should close modal by clicking the background", async () => {
  await test.step("Open modal", async () => {
    // Act
    await form.getByRole("button", { name: button1 }).click();

    // Assert
    await expect(form.getByRole("heading", { name: title1 })).toBeVisible();
  });

  await test.step("Close modal", async () => {
    // Act
    await form.locator("dialog").click(dialogBackgroundPosition);

    // Assert
    await expect(form.getByRole("heading", { name: title1 })).not.toBeVisible();
  });
});
