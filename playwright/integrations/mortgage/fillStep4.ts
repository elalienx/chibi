// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  relationship: string;
  ssn: string;
  civilState: string;
  email: string;
  phone: string;
  employmentType: string;
  claimsPep?: boolean;
}

export default async function fillStep4(form: Locator, props: Props) {
  await test.step("Step 4: Co-applicant info", async () => {
    const { relationship, ssn, civilState, email, phone, employmentType, claimsPep = false } = props;

    await form.getByRole("heading", { name: "Medsökandes personuppgifter" }).waitFor();

    // Relationship
    await form.getByRole("textbox", { name: "Vad har du för relation till din medsökande?" }).click();
    await form.getByRole("radio", { name: relationship }).check();

    // Social security number
    await form.getByRole("textbox", { name: "Medsökandes personnummer" }).fill(ssn);

    // Civil state
    await form.getByRole("textbox", { name: "Medsökandes civilstånd" }).click();
    await form.getByRole("radio", { name: civilState }).check();

    // Contact details
    await form.getByRole("textbox", { name: "Medsökandes e-post" }).fill(email);
    await form.getByRole("textbox", { name: "Medsökandes mobilnummer" }).fill(phone);

    // Employment type
    await form.getByRole("textbox", { name: "Medsökandes anställningsform" }).click();
    await form.getByRole("radio", { name: employmentType }).check();

    // Politically exposed person (PEP)
    if (claimsPep) await form.getByRole("checkbox", { name: "Jag intygar att min medsökande INTE" }).uncheck();

    await form.getByRole("button", { name: "Nästa" }).click();

    // PEP check
    if (claimsPep) await form.page().getByRole("button", { name: "Gå vidare" }).click();
  });
}
