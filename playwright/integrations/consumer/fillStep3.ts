// Node modules
import { test, type Locator } from "@playwright/test";

interface Applicant {
  email: string;
  phone: string;
  ssn: string;
  civilState: string;
  childrenUnder21: string;
}

interface Props {
  mainApplicant: Applicant;
  coApplicant?: Applicant;
}

export default async function fillStep3(form: Locator, { mainApplicant, coApplicant }: Props) {
  await test.step("Step 3: Personal info", async () => {
    await form.getByRole("heading", { name: "Personuppgifter" }).waitFor();

    // Each applicant has its own section, so fields with the same label do not clash.
    const sections = form.locator("section");
    const mainSection = sections.first();
    const coSection = sections.filter({ hasText: "Din medsökande" });

    await test.step("Main applicant", async () => {
      await mainSection.getByRole("textbox", { name: "E-postadress" }).fill(mainApplicant.email);
      await mainSection.getByRole("textbox", { name: "Mobilnummer" }).fill(mainApplicant.phone);
      await mainSection.getByRole("textbox", { name: "Personnummer" }).fill(mainApplicant.ssn);
      await mainSection.getByRole("textbox", { name: "Civilstatus" }).click();
      await mainSection.getByRole("radio", { name: mainApplicant.civilState, exact: true }).check();
      await mainSection.getByRole("textbox", { name: "Barn under 21 år" }).click();
      await mainSection.getByRole("radio", { name: mainApplicant.childrenUnder21, exact: true }).check();
    });

    if (coApplicant) {
      await test.step("Co applicant", async () => {
        await coSection.getByRole("textbox", { name: "E-postadress" }).fill(coApplicant.email);
        await coSection.getByRole("textbox", { name: "Mobilnummer" }).fill(coApplicant.phone);
        await coSection.getByRole("textbox", { name: "Personnummer" }).fill(coApplicant.ssn);
        await coSection.getByRole("textbox", { name: "Civilstatus" }).click();
        await coSection.getByRole("radio", { name: coApplicant.civilState, exact: true }).check();
        await coSection.getByRole("textbox", { name: "Barn under 21 år" }).click();
        await coSection.getByRole("radio", { name: coApplicant.childrenUnder21, exact: true }).check();
      });
    }

    await form.getByRole("button", { name: "Fortsätt" }).click();
  });
}
