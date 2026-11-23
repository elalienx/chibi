// Project files
import preview from "../../../../../.storybook/preview";
import Step2 from "./Step2";

// Metadata
const meta = preview.meta({
  title: "MVP Consumer/Step 2: Co-applicant",
  component: Step2,
});

// Stories
export const Default = meta.story({
  name: "Step 2: Co-applicant",
  render: () => <Step2 />,
});

export default meta;
