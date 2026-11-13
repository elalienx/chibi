// Node modules
import { test, type Locator } from "@playwright/test";

// Project files
import fillChild from "./fillChild";

interface Child {
  age: number;
  receivesAllowance: string;
  livesWithApplicant: string;
  sharedCustody: string;
  maintenance: string;
}

interface Props {
  adults: number;
  children?: readonly Child[];
}

export default async function fillStep7(form: Locator, props: Props) {
  await test.step("Step 7: Household", async () => {
    const { adults, children = [] } = props;

    await form.getByRole("heading", { name: "Om hushållet" }).waitFor();

    // Adults
    await form.getByRole("textbox", { name: "Hur många vuxna är ni i hushållet?" }).fill(String(adults));

    // Children
    for (let index = 0; index < children.length; index++) {
      await form.getByRole("button", { name: "Lägg till ett barn" }).click();
      await fillChild(form, { childNumber: index + 1, ...children[index] });
    }

    await form.getByRole("button", { name: "Nästa" }).click();
  });
}
