// Project files
import preview from "../../../.storybook/preview";
import ValidationMessage from "./ValidationMessage";

// Metadata
const meta = preview.meta({
  title: "Components/Validation Message",
  component: ValidationMessage,
});

// Properties
const errorID = "aria-error-id";

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <ValidationMessage ariaErrorId={errorID}>This field cannot be empty</ValidationMessage>,
});
