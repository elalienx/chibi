// Project files
import preview from "../../../../.storybook/preview";
import Step5 from "./Step5";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 5: Employment",
  component: Step5,
});

// Stories
export const Permanent = meta.story({
  name: "Permanent",
  render: () => <Step5 employmentType="permanent_employment" />,
});

export const SelfEmployment = meta.story({
  name: "Self-employment",
  render: () => <Step5 employmentType="self_employment" />,
});

export const Temporary = meta.story({
  name: "Temporary",
  render: () => <Step5 employmentType="temporary_employment" />,
});

export const Retirement = meta.story({
  name: "Retirement",
  render: () => <Step5 employmentType="retirement" />,
});

export const Student = meta.story({
  name: "Student",
  render: () => <Step5 employmentType="student" />,
});

export default meta;
