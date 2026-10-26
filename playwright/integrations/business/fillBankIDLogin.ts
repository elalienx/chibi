// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  ssn: string;
}

export default async function fillBankIDLogin(form: Locator, { ssn }: Props) {
  await test.step("BankID login", async () => {
    await form.getByRole("textbox", { name: "Personnummer" }).fill(ssn);
    await form.getByRole("button", { name: "Skicka in" }).click();
  });
}
