// Project files
import preview from "../../../../.storybook/preview";
import Step1 from "./Step1";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 1: About the loan",
  component: Step1,
});

// Stories
export const Default = meta.story({
  name: "Step 1: About the loan",
  render: () => <Step1 />,
});

export default meta;
