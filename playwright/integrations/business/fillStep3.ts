// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  company: string;
}

export default async function fillStep3(form: Locator, { company }: Props) {
  await test.step("Step 3: Company selection", async () => {
    await form.getByRole("heading", { name: "Val av bolag" }).waitFor();
    await form.getByRole("radio", { name: company }).check();
    await form.getByRole("button", { name: "Fortsätt" }).click();
  });
}
