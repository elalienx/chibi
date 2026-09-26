// Project files
import preview from "../../../../.storybook/preview";
import Step3 from "./Step3";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 3: Choose company",
  component: Step3,
});

// Stories
export const Default = meta.story({
  name: "Step 3: Choose company",
  render: () => <Step3 />,
});

export default meta;
