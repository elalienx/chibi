// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  civilState: string;
  email: string;
  phone: string;
  employmentType: string;
  hasCoApplicant: "Ja" | "Nej";
  claimsPep?: boolean;
}

export default async function fillStep3(form: Locator, props: Props) {
  await test.step("Step 3: Personal info", async () => {
    const { civilState, email, phone, employmentType, hasCoApplicant, claimsPep = false } = props;

    await form.getByRole("heading", { name: "Dina personuppgifter" }).waitFor();

    // Civil state
    await form.getByRole("textbox", { name: "Civilstånd" }).click();
    await form.getByRole("radio", { name: civilState }).check();

    // Contact details
    await form.getByRole("textbox", { name: "E-postadress" }).fill(email);
    await form.getByRole("textbox", { name: "Mobilnummer" }).fill(phone);

    // Employment type
    await form.getByRole("textbox", { name: "Anställningsform" }).click();
    await form.getByRole("radio", { name: employmentType }).check();

    // Co-applicant
    await form.getByRole("radio", { name: hasCoApplicant }).check();

    // Politically exposed person (PEP)
    if (claimsPep) await form.getByRole("checkbox", { name: "Jag intygar att jag INTE" }).uncheck();

    await form.getByRole("button", { name: "Nästa" }).click();

    // PEP check
    if (claimsPep) await form.page().getByRole("button", { name: "Gå vidare" }).click();
  });
}
