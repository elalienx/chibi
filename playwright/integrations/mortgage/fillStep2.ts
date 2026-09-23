// Node modules
import type { Page } from "@playwright/test";

type Props = {
  squareMeters: number;
  rooms: number;
  tenancyType?: string;
} & ({ monthlyFee: number; operatingCost?: never } | { operatingCost: number; monthlyFee?: never });

export default async function fillStep2(
  page: Page,
  { squareMeters, rooms, tenancyType, monthlyFee, operatingCost }: Props,
) {
  await page.getByRole("heading", { name: "Om bostaden" }).waitFor();
  if (tenancyType !== undefined) {
    await page.locator("#tenancy_type").getByText(tenancyType, { exact: true }).click();
  }
  await page.getByRole("textbox", { name: "Kvadratmeter" }).fill(String(squareMeters));
  await page.getByRole("textbox", { name: "Antal rum" }).fill(String(rooms));
  if (monthlyFee !== undefined) {
    await page.getByRole("textbox", { name: "Månadsavgift" }).fill(String(monthlyFee));
  } else {
    await page.getByRole("textbox", { name: "Driftskostnad" }).fill(String(operatingCost));
  }
  await page.getByRole("button", { name: "Nästa" }).click();
}
