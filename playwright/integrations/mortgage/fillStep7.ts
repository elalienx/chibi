// Node modules
import { test, type Locator } from "@playwright/test";

interface Props {
  adults: number;
}

export default async function fillStep7(form: Locator, props: Props) {
  await test.step("Step 7: Household", async () => {
    const { adults } = props;

    await form.getByRole("heading", { name: "Om hushållet" }).waitFor();
    await form.getByRole("textbox", { name: "Hur många vuxna är ni i hushållet?" }).fill(String(adults));
    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
