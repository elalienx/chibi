// Project files
import preview from "../../../.storybook/preview";
import StepIndicator from "./StepIndicator";

// Metadata
const meta = preview.meta({
  title: "Components/Step Indicator",
  component: StepIndicator,
});

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <StepIndicator currentStep={1} totalSteps={3} />,
});

export const InProgress = meta.story({
  name: "In progress",
  render: () => <StepIndicator currentStep={2} totalSteps={3} />,
});

export const Completed = meta.story({
  name: "Completed",
  render: () => <StepIndicator currentStep={3} totalSteps={3} />,
});

export const Overflow = meta.story({
  name: "Overflow (edge case)",
  render: () => <StepIndicator currentStep={4} totalSteps={3} />,
});
