// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  email: string;
  phone: string;
}

export default async function fillStep2(form: Locator, { email, phone }: Props) {
  await test.step("Step 2: Personal details", async () => {
    await form.getByRole("heading", { name: "Personuppgifter" }).waitFor();
    await form.getByRole("textbox", { name: "E-postadress" }).fill(email);
    await form.getByRole("textbox", { name: "Mobilnummer" }).fill(phone);
    await form.getByRole("button", { name: "Fortsätt med BankID" }).click();
  });
}
