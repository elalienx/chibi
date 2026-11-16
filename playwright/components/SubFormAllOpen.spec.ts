// Node modules
import { test, expect, type Locator } from "@playwright/test";

// Properties
const buttonAddEmployee = "Add employee";
const buttonSubmit = "Submit";
const textCleanup = "Text to clean Playwright selector";
const item1 = "Company name";
const item2 = "Employee name";
const employeeName = "Leif Lend";
const employeeNameSecond = "Lena Lend";
const jobRole = "Developer";
const errorEmployeeName = "Please enter the employee full name";
const errorAddEmployee = "Please make sure the employees are correct before adding another";
const inputWrapperParent = ".."; // The parent of the input is the one having the CSS styles
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-sub-form-all-open/FormPage/Default");
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  await expect(form).toHaveScreenshot();
});

async function addEmployee() {
  await form.getByRole("button", { name: buttonAddEmployee }).click();
}

async function fillEmployee(subForm: Locator, name: string) {
  await subForm.getByRole("textbox", { name: item2 }).fill(name);
  await subForm.getByRole("radio", { name: jobRole }).check();
}

test("1. Should start without sub-forms and open one when clicking add", async () => {
  await test.step("start without sub-forms", async () => {
    // Assert
    await expect(form.getByRole("article")).toHaveCount(0);
  });

  await test.step("open the first sub-form", async () => {
    // Act
    await addEmployee();

    // Assert
    await expect(form.getByRole("article")).toHaveCount(1);
    await expect(form.getByRole("heading", { name: "Employee 1" })).toBeVisible();
    await expect(form.getByRole("textbox", { name: item2 })).toBeVisible();
  });
});

test("2. Should show a message and not add a sub-form when the current one is invalid", async () => {
  // Arrange
  await addEmployee();

  // Act
  await addEmployee();

  // Assert
  await expect(form.getByRole("article")).toHaveCount(1);
  await expect(form.getByText(errorAddEmployee)).toBeVisible();
  await expect(form.getByRole("textbox", { name: item2 })).toBeFocused();
});

test("3. Should add a sub-form when the previous one is valid", async () => {
  // Arrange
  await addEmployee();
  await fillEmployee(form.getByRole("article").nth(0), employeeName);

  // Act
  await addEmployee();

  // Assert
  await expect(form.getByRole("article")).toHaveCount(2);
  await expect(form.getByRole("heading", { name: "Employee 2" })).toBeVisible();
});

test("4. Should validate every sub-form on submit, not only the last one", async ({ page }) => {
  // Arrange
  let isAlertShown = false;
  page.once("dialog", async (dialog) => {
    isAlertShown = true;
    await dialog.accept();
  });
  await form.getByRole("textbox", { name: item1 }).fill("Eduardo");
  await addEmployee();
  await fillEmployee(form.getByRole("article").nth(0), employeeName);
  await addEmployee();
  await fillEmployee(form.getByRole("article").nth(1), employeeNameSecond);
  await form.getByRole("article").nth(0).getByRole("textbox", { name: item2 }).clear();

  // Act
  await form.getByRole("button", { name: buttonSubmit }).click();

  // Assert
  await expect(form.getByRole("article").nth(0).getByText(errorEmployeeName)).toBeVisible();
  await expect(form.getByRole("article").nth(1).getByText(errorEmployeeName)).toHaveCount(0);
  expect(isAlertShown).toBe(false);
});

test("5. Should not validate the parent form when adding a sub-form", async () => {
  // Arrange
  await addEmployee();
  await fillEmployee(form.getByRole("article").nth(0), employeeName);

  // Act
  await addEmployee();

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(inputWrapperParent)).toHaveClass(/default/);
});

test("6. Should delete a sub-form and keep the inputs of the others", async () => {
  // Arrange
  await addEmployee();
  await fillEmployee(form.getByRole("article").nth(0), employeeName);
  await addEmployee();
  await fillEmployee(form.getByRole("article").nth(1), employeeNameSecond);

  // Act
  await form.getByRole("button", { name: "Delete Employee 1" }).click();

  // Assert
  await expect(form.getByRole("article")).toHaveCount(1);
  await expect(form.getByRole("heading", { name: "Employee 1" })).toBeVisible();
  await expect(form.getByRole("textbox", { name: item2 })).toHaveValue(employeeNameSecond);
});

test("7. Should not submit when a sub-form is invalid", async ({ page }) => {
  // Arrange
  let isAlertShown = false;
  page.once("dialog", async (dialog) => {
    isAlertShown = true;
    await dialog.accept();
  });
  await form.getByRole("textbox", { name: item1 }).fill("Eduardo");
  await addEmployee();

  // Act
  await form.getByRole("button", { name: buttonSubmit }).click();

  // Assert
  await expect(form.getByText(errorEmployeeName)).toBeVisible();
  expect(isAlertShown).toBe(false);
});

test("8. Should submit the parent form with the employees", async ({ page }) => {
  // Arrange
  let alertMessage = "";
  page.once("dialog", async (dialog) => {
    alertMessage = dialog.message();
    await dialog.accept();
  });
  await form.getByRole("textbox", { name: item1 }).fill("Eduardo");
  await addEmployee();
  await fillEmployee(form.getByRole("article").nth(0), employeeName);

  // Act
  await form.getByRole("button", { name: buttonSubmit }).click();

  // Assert
  await expect.poll(() => alertMessage).toBe("Success! Eduardo has 1 employee(s)");
});

test("9. Should hide the add message once the employees are fixed", async () => {
  // Arrange
  await addEmployee();
  await addEmployee();

  // Act
  await fillEmployee(form.getByRole("article").nth(0), employeeName);

  // Assert
  await expect(form.getByText(errorAddEmployee)).toHaveCount(0);
});
