// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  childNumber: number;
  age: number;
  receivesAllowance: "Ja" | "Nej";
  livesWithApplicant: "Ja" | "Nej";
  sharedCustody: "Ja" | "Nej";
  maintenance: "Betalar underhåll" | "Får underhåll" | "Inget underhåll";
}

export default async function fillChild(form: Locator, props: Props) {
  const { childNumber, age, receivesAllowance, livesWithApplicant, sharedCustody, maintenance } = props;

  await test.step(`Child ${childNumber}`, async () => {
    const child = form.locator(".child-form").filter({
      has: form.page().getByRole("heading", { name: `Barn ${childNumber}` }),
    });

    await child.getByRole("heading", { name: `Barn ${childNumber}` }).waitFor();

    // Age
    await child.getByRole("textbox", { name: "Barnets ålder" }).click();
    await child.getByRole("radio", { name: `${age} år`, exact: true }).check();

    // Yes/no questions (scoped by group because every answer is "Ja" or "Nej")
    await child
      .locator(".radio-group", {
        hasText: "Får du barnbidrag eller studiebidrag?",
      })
      .getByRole("radio", { name: receivesAllowance })
      .check();
    await child
      .locator(".radio-group", { hasText: "Bor barnet hos dig?" })
      .getByRole("radio", { name: livesWithApplicant })
      .check();
    await child
      .locator(".radio-group", { hasText: "Har du delad vårdnad?" })
      .getByRole("radio", { name: sharedCustody })
      .check();

    // Maintenance
    await child.getByRole("radio", { name: maintenance }).check();

    await child.getByRole("button", { name: "Spara" }).click();
  });
}
