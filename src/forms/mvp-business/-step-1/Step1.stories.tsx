// Project files
import preview from "../../../../.storybook/preview";
import Step1 from "./Step1";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step1",
  component: Step1,
});

// Stories
export const Default = meta.story({
  name: "Step1",
  render: () => <Step1 />,
});

export default meta;
