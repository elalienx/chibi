// Project files
import preview from "../../../../../.storybook/preview";
import Step3 from "./Step3";

// Metadata
const meta = preview.meta({
  title: "MVP Consumer/Step 3: Personal info",
  component: Step3,
});

// Stories
export const SingleApplicant = meta.story({
  name: "Single applicant",
  render: () => <Step3 hasCoApplicant={false} />,
});

export const WithCoApplicant = meta.story({
  name: "With co-applicant",
  render: () => <Step3 hasCoApplicant={true} />,
});

export default meta;
