// Project files
import preview from "../../../../../.storybook/preview";
import Step6 from "./Step6";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 6: Co-applicant employment",
  component: Step6,
});

// Stories
export const Permanent = meta.story({
  name: "Permanent",
  render: () => <Step6 employmentType="permanent_employment" />,
});

export const SelfEmployment = meta.story({
  name: "Self-employment",
  render: () => <Step6 employmentType="self_employment" />,
});

export const Temporary = meta.story({
  name: "Temporary",
  render: () => <Step6 employmentType="temporary_employment" />,
});

export const Retirement = meta.story({
  name: "Retirement",
  render: () => <Step6 employmentType="retirement" />,
});

export const Student = meta.story({
  name: "Student",
  render: () => <Step6 employmentType="student" />,
});

export default meta;
