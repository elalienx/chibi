// Node modules
import { expect, test, type Locator } from "@playwright/test";

interface Props {
  purpose: string;
  details?: string;
}

export default async function fillStep5(form: Locator, { purpose, details }: Props) {
  await test.step("Step 5: Loan purpose", async () => {
    await form.getByRole("heading", { name: "Lånesyfte", exact: true }).waitFor();
    await expect(form.locator(".sub-form-details")).not.toBeVisible();
    await form.getByText("Maskiner & Utrustning", { exact: true }).click();
    await expect(form.getByRole("heading", { name: "Du valde: Maskiner & Utrustning", exact: true })).toBeVisible();
    await form.getByText(purpose, { exact: true }).click();
    await expect(form.getByRole("heading", { name: `Du valde: ${purpose}`, exact: true })).toBeVisible();
    const input = form.getByRole("textbox", { name: "Berätta mer om ditt lånesyfte" });
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("placeholder", "t.ex. tre nya truckar till lagret...");
    if (details) await input.fill(details);
    await form.getByRole("button", { name: "Fortsätt", exact: true }).click();
  });
}
