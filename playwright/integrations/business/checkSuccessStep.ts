// Node modules
import { expect, test, type Page } from "@playwright/test";

interface Props {
  result1: string;
}

export default async function checkSuccessStep(page: Page, { result1 }: Props) {
  await test.step("Acceptance", async () => {
    await page.getByRole("heading", { name: "Form submitted" }).waitFor();
    await expect(page.getByText(result1)).toBeVisible();
  });
}
