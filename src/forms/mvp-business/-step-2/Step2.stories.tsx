// Project files
import preview from "../../../../.storybook/preview";
import Step2 from "./Step2";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step2",
  component: Step2,
});

// Stories
export const Default = meta.story({
  name: "Step2",
  render: () => <Step2 />,
});

export default meta;
