// Node modules
import { expect, test, type Locator } from "@playwright/test";

interface Props {
  result1: string;
}

export default async function checkSuccessStep(form: Locator, { result1 }: Props) {
  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();
    await expect(form.getByText(result1)).toBeVisible();
  });
}
