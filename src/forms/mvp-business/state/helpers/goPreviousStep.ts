// Project files
import type { Step } from "forms/road-to-mvp-2/types/Step";

export default function goPreviousStep(step: Step, previousSteps: Step[]) {
  // Safeguard
  if (previousSteps.length === 0) {
    console.info("You cannot navigate backward anymore.");

    return { step, previousSteps };
  }

  // Properties
  const stepIndex = previousSteps.length - 1;
  const previousStep = previousSteps[stepIndex];
  const newPreviousSteps = previousSteps.slice(0, -1);

  return { step: previousStep, previousSteps: newPreviousSteps };
}
