// Node modules
// @ts-ignore
import type { Locator } from "@playwright/test";
import { test, expect, type MountResult } from "@playwright/experimental-ct-react";

// Project files
import FormPage from "forms/example-modal/FormPage";

const modalTitle1 = "About Guiness!";
const modalTitle2 = "I am a the PC-Engine modal!";
const closeModalLabel = "Close";
const dialogBackgroundPosition = { position: { x: 0, y: 0 } }; // this is the top left part of the screen covered by the modal background
let component: MountResult;
let cleanUpText: Locator;
let buttonOpenModal1: Locator;
let buttonOpenModal2: Locator;

test.beforeEach(async ({ mount }) => {
  component = await mount(<FormPage />);
  cleanUpText = component.getByText("Text to clean Playwright selector");
  buttonOpenModal1 = component.getByRole("button", { name: "Open Guiness modal" });
  buttonOpenModal2 = component.getByRole("button", { name: "Open PC-Engine modal" });
});

test.afterEach(async () => {
  await expect(cleanUpText).toBeVisible();

  // Only run visual regression locally
  if (!process.env.CI) await expect(component).toHaveScreenshot();
});

test("1. Should be able to open and close the first modal", async () => {
  await test.step("Open modal", async () => {
    // Act
    await buttonOpenModal1.click();

    // Assert
    await expect(component.getByRole("heading", { name: modalTitle1 })).toBeVisible();
    await expect(component.getByRole("button", { name: closeModalLabel })).toBeVisible();
  });

  await test.step("Close modal", async () => {
    // Act
    await component.getByRole("button", { name: closeModalLabel }).click();

    // Assert
    await expect(component.getByRole("heading", { name: modalTitle1 })).not.toBeVisible();
    await expect(component.getByRole("button", { name: closeModalLabel })).not.toBeVisible();
  });
});

test("2. Should be able to open and close the second modal", async () => {
  await test.step("Open modal", async () => {
    // Act
    await buttonOpenModal2.click();

    // Assert
    await expect(component.getByRole("heading", { name: modalTitle2 })).toBeVisible();
    await expect(component.getByRole("button", { name: closeModalLabel })).toBeVisible();
  });

  await test.step("Close modal", async () => {
    // Act
    await component.getByRole("button", { name: closeModalLabel }).click();

    // Assert
    await expect(component.getByRole("heading", { name: modalTitle2 })).not.toBeVisible();
    await expect(component.getByRole("button", { name: closeModalLabel })).not.toBeVisible();
  });
});

test("3. Should close modal by clicking the background", async () => {
  await test.step("Open modal", async () => {
    // Act
    await buttonOpenModal1.click();

    // Assert
    await expect(component.getByRole("heading", { name: modalTitle1 })).toBeVisible();
  });

  await test.step("Close modal", async () => {
    // Act
    await component.locator("dialog").click(dialogBackgroundPosition);

    // Assert
    await expect(component.getByRole("heading", { name: modalTitle1 })).not.toBeVisible();
  });
});
