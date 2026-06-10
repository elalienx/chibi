// Project files
import type { Step } from "forms/road-to-mvp-2/types/Step";

export default function setStep(step: Step, previousSteps: Step[], newStep: Step) {
  // Safeguard
  if (step === newStep) {
    console.info("You are trying to navigate to the same page.");

    return { step, previousSteps };
  }

  // Properties
  const newPreviousSteps = [...previousSteps, step];

  return { previousSteps: newPreviousSteps, step: newStep };
}
