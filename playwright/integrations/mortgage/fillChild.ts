// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  childNumber: number;
  age: number;
  receivesAllowance: string;
  livesWithApplicant: string;
  sharedCustody: string;
  maintenance: string;
}

export default async function fillChild(form: Locator, props: Props) {
  const { childNumber, age, receivesAllowance, livesWithApplicant, sharedCustody, maintenance } = props;

  await test.step(`Child ${childNumber}`, async () => {
    const child = form.locator(".child-form");

    await child.getByRole("heading", { name: `Barn ${childNumber}` }).waitFor();

    // Age
    const ageLabel = age === 0 ? "Under 1 år" : `${age} år`; // Same labels as ChildForm.

    await child.getByRole("textbox", { name: "Barnets ålder" }).click();
    await child.getByRole("radio", { name: ageLabel, exact: true }).check();

    // Yes/no questions
    await child.locator("#child_receives_allowance").getByRole("radio", { name: receivesAllowance }).check();
    await child.locator("#child_lives_with_applicant").getByRole("radio", { name: livesWithApplicant }).check();
    await child.locator("#child_shared_custody").getByRole("radio", { name: sharedCustody }).check();

    // Maintenance
    await child.getByRole("radio", { name: maintenance }).check();

    await child.getByRole("button", { name: "Spara" }).click();
  });
}
