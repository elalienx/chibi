// Node modules
import { expect, test, type Locator } from "@playwright/test";

interface Props {
  adults: number;
}

export default async function fillStep7(form: Locator, props: Props) {
  await test.step("Step 7: Household", async () => {
    const { adults } = props;

    await form.getByRole("heading", { name: "Om hushållet" }).waitFor();

    // Adults (the counter starts at 1)
    const adultsInput = form.getByRole("textbox", { name: "Hur många vuxna är ni i hushållet?" });

    for (let count = 1; count < adults; count++) await form.getByRole("button", { name: "Öka" }).click();
    await expect(adultsInput).toHaveValue(String(adults));

    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
