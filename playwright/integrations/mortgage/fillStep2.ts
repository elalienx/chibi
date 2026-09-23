// Node modules
import { test, type Locator } from "@playwright/test";

type Props = {
  squareMeters: number;
  rooms: number;
  tenancyType?: string;
} & ({ monthlyFee: number; operatingCost?: never } | { operatingCost: number; monthlyFee?: never });

export default async function fillStep2(
  form: Locator,
  { squareMeters, rooms, tenancyType, monthlyFee, operatingCost }: Props,
) {
  await test.step("Step 2: About the property", async () => {
    await form.getByRole("heading", { name: "Om bostaden" }).waitFor();

    if (tenancyType !== undefined) {
      await form.locator("#tenancy_type").getByText(tenancyType, { exact: true }).click();
    }

    await form.getByRole("textbox", { name: "Kvadratmeter" }).fill(String(squareMeters));
    await form.getByRole("textbox", { name: "Antal rum" }).fill(String(rooms));
    
    if (monthlyFee !== undefined) {
      await form.getByRole("textbox", { name: "Månadsavgift" }).fill(String(monthlyFee));
    } else {
      await form.getByRole("textbox", { name: "Driftskostnad" }).fill(String(operatingCost));
    }
    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
