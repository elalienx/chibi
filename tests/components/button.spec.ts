// Node modules
import { test, expect } from "@playwright/test";

// Project files
import type { WithLabel } from "../../src/components/button/Button.story";

test("renders its children as the label", async ({ mount }) => {
  const component = await mount("components/button/Button/Primary");

  await expect(component.getByRole("button")).toHaveText("Hello");
});

test("renders a per-test label passed as props", async ({ mount }) => {
  const component = await mount<typeof WithLabel>(
    "components/button/Button/WithLabel",
    { label: "Kawaii" },
  );

  await expect(component.getByRole("button")).toHaveText("Kawaii");
});

test("fires onClick when clicked", async ({ mount }) => {
  const component = await mount("components/button/Button/CountsClicks");

  await expect(component.getByTestId("count")).toHaveValue("0");
  await component.getByRole("button").click();
  await expect(component.getByTestId("count")).toHaveValue("1");
});
