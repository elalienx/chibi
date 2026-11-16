// Node modules
import { test, expect, type Locator } from "@playwright/test";

// Properties
const buttonAddEmployee = "Add employee";
const butonCancel = "Cancel";
const buttonSave = "Save";
const buttonSubmit = "Submit";
const textCleanup = "Text to clean Playwright selector";
const item1 = "Company name";
const item2 = "Employee name";
const employeeName = "Leif Lend";
const employeeNameEdited = "Leif Lendsson";
const jobRole = "Developer";
const errorEmployeeName = "Please enter the employee full name";
const errorJobRole = "Pick a job role";
const inputWrapperParent = ".."; // The parent of the input is the one having the CSS styles
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-sub-form-one-open/FormPage/Default");
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  await expect(form).toHaveScreenshot();
});

async function fillEmployee(name: string) {
  await form.getByRole("button", { name: buttonAddEmployee }).click();
  await form.getByRole("textbox", { name: item2 }).fill(name);
  await form.getByRole("radio", { name: jobRole }).check();
  await form.getByRole("button", { name: buttonSave }).click();
}

test("1. Should open the sub-form and disable the parent submit button", async () => {
  // Act
  await form.getByRole("button", { name: buttonAddEmployee }).click();

  // Assert
  await expect(form.getByRole("textbox", { name: item2 })).toBeVisible();
  await expect(form.getByRole("button", { name: buttonAddEmployee })).not.toBeVisible();
  await expect(form.getByRole("button", { name: buttonSubmit })).toBeDisabled();
});

test("2. Should close the sub-form without saving when clicking cancel", async () => {
  // Arrange
  await form.getByRole("button", { name: buttonAddEmployee }).click();
  await form.getByRole("textbox", { name: item2 }).fill(employeeName);

  // Act
  await form.getByRole("button", { name: butonCancel }).click();

  // Assert
  await expect(form.getByRole("textbox", { name: item2 })).not.toBeVisible();
  await expect(form.getByText(employeeName)).not.toBeVisible();
  await expect(form.getByRole("button", { name: buttonSubmit })).toBeEnabled();
});

test("3. Should show errors when saving an empty sub-form", async () => {
  // Arrange
  await form.getByRole("button", { name: buttonAddEmployee }).click();

  // Act
  await form.getByRole("button", { name: buttonSave }).click();

  // Assert
  await expect(form.getByText(errorEmployeeName)).toBeVisible();
  await expect(form.getByText(errorJobRole)).toBeVisible();
});

test("4. Should not validate the parent form when saving the sub-form", async () => {
  // Act
  await fillEmployee(employeeName);

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(inputWrapperParent)).toHaveClass(/default/);
});

test("5. Should show a card with the employee name after saving", async () => {
  // Act
  await fillEmployee(employeeName);

  // Assert
  await expect(form.getByRole("article")).toHaveText(employeeName);
  await expect(form.getByRole("textbox", { name: item2 })).not.toBeVisible();
});

test("6. Should edit a saved employee", async () => {
  await test.step("open the saved employee", async () => {
    // Arrange
    await fillEmployee(employeeName);

    // Act
    await form.getByRole("button", { name: `Edit ${employeeName}` }).click();

    // Assert
    await expect(form.getByRole("textbox", { name: item2 })).toHaveValue(employeeName);
    await expect(form.getByRole("radio", { name: jobRole })).toBeChecked();
  });

  await test.step("save the changes", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item2 }).fill(employeeNameEdited);

    // Act
    await form.getByRole("button", { name: buttonSave }).click();

    // Assert
    await expect(form.getByRole("article")).toHaveCount(1);
    await expect(form.getByRole("article")).toHaveText(employeeNameEdited);
  });
});

test("7. Should delete a saved employee", async () => {
  // Arrange
  await fillEmployee(employeeName);

  // Act
  await form.getByRole("button", { name: `Delete ${employeeName}` }).click();

  // Assert
  await expect(form.getByRole("article")).toHaveCount(0);
});

test("8. Should submit the parent form with the saved employees", async ({ page }) => {
  // Arrange
  let alertMessage = "";
  page.once("dialog", async (dialog) => {
    alertMessage = dialog.message();
    await dialog.accept();
  });
  await form.getByRole("textbox", { name: item1 }).fill("Eduardo");
  await fillEmployee(employeeName);

  // Act
  await form.getByRole("button", { name: buttonSubmit }).click();

  // Assert
  await expect.poll(() => alertMessage).toBe("Success! Eduardo has 1 employee(s)");
});
