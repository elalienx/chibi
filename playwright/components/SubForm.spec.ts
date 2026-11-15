// Node modules
import { test, expect, type Locator } from "@playwright/test";

// Properties
const addFriend = "Add";
const cancel = "Cancel";
const save = "Save";
const submit = "Submit";
const textCleanup = "Text to clean Playwright selector";
const item1 = "Your name";
const item2 = "Friend name";
const friendName = "Leif Lend";
const friendNameEdited = "Leif Lendsson";
const song = "Senbonzakura";
const errorFriendName = "Please enter your friend's full name";
const errorSong = "Pick a song";
const parent = ".."; // The parent of the input is the one having the CSS styles
let form: Locator;

test.beforeEach(async ({ mount }) => {
  form = await mount("forms/example-sub-form/FormPage/Default");
});

test.afterEach(async () => {
  await expect(form.getByText(textCleanup)).toBeVisible();

  await expect(form).toHaveScreenshot();
});

/** Opens the sub-form, fills it with valid data, and saves it. */
async function addValidFriend(name: string) {
  await form.getByRole("button", { name: addFriend }).click();
  await form.getByRole("textbox", { name: item2 }).fill(name);
  await form.getByRole("radio", { name: song }).check();
  await form.getByRole("button", { name: save }).click();
}

test("1. Should open the sub-form and disable the parent submit button", async () => {
  // Act
  await form.getByRole("button", { name: addFriend }).click();

  // Assert
  await expect(form.getByRole("textbox", { name: item2 })).toBeVisible();
  await expect(form.getByRole("button", { name: addFriend })).not.toBeVisible();
  await expect(form.getByRole("button", { name: submit })).toBeDisabled();
});

test("2. Should close the sub-form without saving when clicking cancel", async () => {
  // Arrange
  await form.getByRole("button", { name: addFriend }).click();
  await form.getByRole("textbox", { name: item2 }).fill(friendName);

  // Act
  await form.getByRole("button", { name: cancel }).click();

  // Assert
  await expect(form.getByRole("textbox", { name: item2 })).not.toBeVisible();
  await expect(form.getByText(friendName)).not.toBeVisible();
  await expect(form.getByRole("button", { name: submit })).toBeEnabled();
});

test("3. Should show errors when saving an empty sub-form", async () => {
  // Arrange
  await form.getByRole("button", { name: addFriend }).click();

  // Act
  await form.getByRole("button", { name: save }).click();

  // Assert
  await expect(form.getByText(errorFriendName)).toBeVisible();
  await expect(form.getByText(errorSong)).toBeVisible();
});

test("4. Should not validate the parent form when saving the sub-form", async () => {
  // Act
  await addValidFriend(friendName);

  // Assert
  await expect(form.getByRole("textbox", { name: item1 }).locator(parent)).toHaveClass(/default/);
});

test("5. Should show a card with the friend name after saving", async () => {
  // Act
  await addValidFriend(friendName);

  // Assert
  await expect(form.getByRole("article")).toHaveText(friendName);
  await expect(form.getByRole("textbox", { name: item2 })).not.toBeVisible();
});

test("6. Should edit a saved friend", async () => {
  await test.step("open the saved friend", async () => {
    // Arrange
    await addValidFriend(friendName);

    // Act
    await form.getByRole("button", { name: `Edit ${friendName}` }).click();

    // Assert
    await expect(form.getByRole("textbox", { name: item2 })).toHaveValue(friendName);
    await expect(form.getByRole("radio", { name: song })).toBeChecked();
  });

  await test.step("save the changes", async () => {
    // Arrange
    await form.getByRole("textbox", { name: item2 }).fill(friendNameEdited);

    // Act
    await form.getByRole("button", { name: save }).click();

    // Assert
    await expect(form.getByRole("article")).toHaveCount(1);
    await expect(form.getByRole("article")).toHaveText(friendNameEdited);
  });
});

test("7. Should delete a saved friend", async () => {
  // Arrange
  await addValidFriend(friendName);

  // Act
  await form.getByRole("button", { name: `Delete ${friendName}` }).click();

  // Assert
  await expect(form.getByRole("article")).toHaveCount(0);
});

test("8. Should submit the parent form with the saved friends", async ({ page }) => {
  // Arrange
  let alertMessage = "";
  page.once("dialog", async (dialog) => {
    alertMessage = dialog.message();
    await dialog.accept();
  });
  await form.getByRole("textbox", { name: item1 }).fill("Eduardo");
  await addValidFriend(friendName);

  // Act
  await form.getByRole("button", { name: submit }).click();

  // Assert
  await expect.poll(() => alertMessage).toBe("Success! Eduardo has 1 friend(s)");
});
