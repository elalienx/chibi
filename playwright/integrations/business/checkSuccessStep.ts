// Node modules
import { expect, test, type Locator } from "@playwright/test";

export default async function checkSuccessStep(form: Locator) {
  await test.step("Acceptance", async () => {
    await form.getByRole("heading", { name: "Tack för din ansökan!" }).waitFor();

    await expect(form.getByRole("img", { name: "Ansökan skickad" })).toBeVisible();
    await expect(form.getByRole("heading", { name: "Vad händer nu?" })).toBeVisible();
    await expect(form.getByText("Din ansökan har skickats till våra långivare")).toBeVisible();
  });
}
