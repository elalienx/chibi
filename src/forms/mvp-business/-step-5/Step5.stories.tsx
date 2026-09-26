// Project files
import preview from "../../../../.storybook/preview";
import Step5 from "./Step5";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step5",
  component: Step5,
});

// Stories
export const Default = meta.story({
  name: "Step5",
  render: () => <Step5 />,
});

export default meta;
