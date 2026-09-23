// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  propertyType: "Villa" | "Lägenhet" | "Radhus" | "Fritidshus";
}

export default async function fillStep1(form: Locator, { propertyType }: Props) {
  await test.step("Step 1: About the loan", async () => {
    await form.getByRole("heading", { name: "Om lånet" }).waitFor();
    await form.locator("#property_type").getByText(propertyType, { exact: true }).click();
    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
