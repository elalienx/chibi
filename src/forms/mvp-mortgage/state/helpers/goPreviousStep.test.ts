// Node modules
import { afterEach, expect, test, vi } from "vitest";

// Project files
import goPreviousStep from "./goPreviousStep";
import type { Step } from "../../types/Step";

afterEach(() => {
  vi.restoreAllMocks();
});

test("should go to the previous step and remove it from history", () => {
  // Arrange
  const currentStep = "success-step";
  const previousSteps: Step[] = ["intro-step", "step-1"];

  // Act
  const test = goPreviousStep(currentStep, previousSteps);

  // Assert
  expect(test).toEqual({ step: "step-1", previousSteps: ["intro-step"] });
});

test("should trigger the safeguard and return the exact same state if history is empty", () => {
  // Arrange
  const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  const currentStep: Step = "step-2" as Step;
  const previousSteps: Step[] = [];

  // Act
  const result = goPreviousStep(currentStep, previousSteps);

  // Assert
  expect(result).toEqual({ step: "step-2", previousSteps: [] });
  expect(consoleSpy).toHaveBeenCalledWith("You cannot navigate backward anymore.");
});
