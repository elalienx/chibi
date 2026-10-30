// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  employer: string;
  sinceYear: number;
  sinceMonth: string;
  toYear?: number;
  toMonth?: string;
  monthlyIncome: number;
  profession: string;
  foreignCurrency: "Ja" | "Nej";
}

export default async function fillStep6(form: Locator, props: Props) {
  await test.step("Step 6: Co-applicant employment", async () => {
    const { employer, sinceYear, sinceMonth, toYear, toMonth, monthlyIncome, profession, foreignCurrency } = props;

    await form.getByRole("heading", { name: "Din medsökandes arbetssituation" }).waitFor();

    // Employer
    await form.getByRole("textbox", { name: "Medsökandes arbetsgivare" }).fill(employer);

    // Employed since
    await form.getByRole("textbox", { name: "Anställd sedan", exact: true }).click();
    await form.getByRole("radio", { name: String(sinceYear), exact: true }).check();
    await form.getByRole("textbox", { name: "Anställd sedan, månad", exact: true }).click();
    await form.getByRole("radio", { name: sinceMonth, exact: true }).check();

    // Employed until
    if (toYear) {
      await form.getByRole("textbox", { name: "Anställd till", exact: true }).click();
      await form.getByRole("radio", { name: String(toYear), exact: true }).check();
    }
    if (toMonth) {
      await form.getByRole("textbox", { name: "Anställd till, månad", exact: true }).click();
      await form.getByRole("radio", { name: toMonth, exact: true }).check();
    }

    // Income and profession
    await form.getByRole("textbox", { name: "Medsökandes månadsinkomst (före skatt)" }).fill(String(monthlyIncome));
    await form.getByRole("textbox", { name: "Medsökandes yrke" }).fill(profession);

    // Foreign currency income
    await form.getByRole("radio", { name: foreignCurrency, exact: true }).check();

    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
