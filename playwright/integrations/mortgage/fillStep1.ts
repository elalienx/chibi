// Node modules
import { test, type Page } from "@playwright/test";

interface Props {
  propertyType: "Villa" | "Lägenhet" | "Radhus" | "Fritidshus";
}

export default async function fillStep1(page: Page, { propertyType }: Props) {
  await test.step("Step 1: About the loan", async () => {
    await page.getByRole("heading", { name: "Om lånet" }).waitFor();
    await page.locator("#property_type").getByText(propertyType, { exact: true }).click();
    await page.getByRole("button", { name: "Nästa" }).click();
  });
}
