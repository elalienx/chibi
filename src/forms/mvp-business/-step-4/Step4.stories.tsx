// Project files
import preview from "../../../../.storybook/preview";
import Step4 from "./Step4";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 4: Turnover",
  component: Step4,
});

// Stories
export const Default = meta.story({
  name: "Step 4: Turnover",
  render: () => <Step4 />,
});

export default meta;
