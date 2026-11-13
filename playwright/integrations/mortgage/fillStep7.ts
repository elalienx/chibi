// Node modules
import { expect, test, type Locator } from "@playwright/test";

interface Props {
  adults: number;
}

export default async function fillStep7(form: Locator, props: Props) {
  await test.step("Step 7: Household", async () => {
    const { adults } = props;
    const adultsInput = form.getByRole("textbox", { name: "Hur många vuxna är ni i hushållet?" });

    await form.getByRole("heading", { name: "Om hushållet" }).waitFor();

    // Fill the number of adults and expect it to work
    for (let count = 1; count < adults; count++) await form.getByRole("button", { name: "Öka" }).click();
    await expect(adultsInput).toHaveValue(String(adults));

    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
