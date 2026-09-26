// Project files
import preview from "../../../../.storybook/preview";
import Step2 from "./Step2";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info",
  component: Step2,
});

// Stories
export const Default = meta.story({
  name: "Step 2: Personal info",
  render: () => <Step2 />,
});

export default meta;
