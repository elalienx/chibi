// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  hasCoApplicant: "Ja" | "Nej";
}

export default async function fillStep2(form: Locator, { hasCoApplicant }: Props) {
  await test.step("Step 2: Co-applicant", async () => {
    await form.getByRole("heading", { name: "Medsökande" }).waitFor();
    await form.getByRole("radio", { name: hasCoApplicant }).check();
    await form.getByRole("button", { name: "Fortsätt" }).click();
  });
}
