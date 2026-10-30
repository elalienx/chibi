// Project files
import preview from "../../../../.storybook/preview";
import Step5 from "./Step5";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 5: Employment",
  component: Step5,
});

// Stories
export const Default = meta.story({
  name: "Step 5: Employment",
  render: () => <Step5 />,
});

export default meta;
