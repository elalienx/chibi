// Project files
import preview from "../../../.storybook/preview";
import FormPage from "./FormPage";

// Metadata
const meta = preview.meta({
  title: "Full examples/Checkbox`",
  component: FormPage,
});

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <FormPage />,
});
