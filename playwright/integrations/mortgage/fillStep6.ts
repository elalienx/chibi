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
    await form.getByRole("textbox", { name: "Anställd sedan", exact: true }).click(); // requires exact as starts identically as month
    await form.getByRole("radio", { name: String(sinceYear) }).check();
    await form.getByRole("textbox", { name: "Anställd sedan, månad" }).click();
    await form.getByRole("radio", { name: sinceMonth }).check();

    // Employed until
    if (toYear) {
      await form.getByRole("textbox", { name: "Anställd till", exact: true }).click(); // requires exact as starts identically as month
      await form.getByRole("radio", { name: String(toYear) }).check();
    }
    if (toMonth) {
      await form.getByRole("textbox", { name: "Anställd till, månad" }).click();
      await form.getByRole("radio", { name: toMonth }).check();
    }

    // Income and profession
    await form.getByRole("textbox", { name: "Medsökandes månadsinkomst (före skatt)" }).fill(String(monthlyIncome));
    await form.getByRole("textbox", { name: "Medsökandes yrke" }).fill(profession);

    // Foreign currency income
    await form.getByRole("radio", { name: foreignCurrency }).check();

    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
