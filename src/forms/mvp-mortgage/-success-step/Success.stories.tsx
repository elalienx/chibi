// Project files
import preview from "../../../../.storybook/preview";
import Success from "./Success";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Success",
  component: Success,
});

// Stories
export const Default = meta.story({
  name: "Success",
  render: () => <Success />,
});

export default meta;
