// Project files
import preview from "../../../../.storybook/preview";
import Success from "./Success";

// Metadata
const meta = preview.meta({
  title: "MVP Consumer/Success",
  component: Success,
});

// Stories
export const SingleApplicant = meta.story({
  name: "Single applicant",
  render: () => <Success hasCoApplicant={false} />,
});

export const WithCoApplicant = meta.story({
  name: "With co-applicant",
  render: () => <Success hasCoApplicant={true} />,
});

export default meta;
