// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  squareMeters: number;
  rooms: number;
  tenancyType?: string;
  monthlyFee?: number;
  operatingCost?: number;
}

export default async function fillStep2(form: Locator, props: Props) {
  await test.step("Step 2: About the property", async () => {
    const { squareMeters, rooms, tenancyType, monthlyFee, operatingCost } = props;

    await form.getByRole("heading", { name: "Om bostaden" }).waitFor();

    // Tenancy type
    if (tenancyType) await form.locator("#tenancy_type").getByText(tenancyType).click();

    // Property size in square metters
    await form.getByRole("textbox", { name: "Kvadratmeter" }).fill(String(squareMeters));

    // Total number of rooms
    await form.getByRole("textbox", { name: "Antal rum" }).fill(String(rooms));

    // Property fees
    if (monthlyFee) await form.getByRole("textbox", { name: "Månadsavgift" }).fill(String(monthlyFee));
    if (operatingCost) await form.getByRole("textbox", { name: "Driftskos" }).fill(String(operatingCost));

    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
