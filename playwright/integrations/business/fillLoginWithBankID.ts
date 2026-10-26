// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  ssn: string;
}

export default async function fillLoginWithBankID(form: Locator, { ssn }: Props) {
  await test.step("Login with BankID", async () => {
    await form.getByRole("textbox", { name: "Personnummer" }).fill(ssn);
    await form.getByRole("button", { name: "Skicka in" }).click();
  });
}
