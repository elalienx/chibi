// Node modules
import { expect, test, type Locator } from "@playwright/test";

interface Props {
  result: string;
}

export default async function checkSuccessStep(form: Locator, { result }: Props) {
  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Form submitted" }).waitFor();
    await expect(form.getByText(result)).toBeVisible();
  });
}
