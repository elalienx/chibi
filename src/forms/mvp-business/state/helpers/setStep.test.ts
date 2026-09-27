// Node modules
import { afterEach, expect, test, vi } from "vitest";

// Project files
import setStep from "./setStep";
import type { Step } from "forms/mvp-business/types/Step";

afterEach(() => {
  vi.restoreAllMocks();
});

test("should set the new step and append the current step to history", () => {
  // Arrange
  const currentStep: Step = "step-1";
  const previousSteps: Step[] = [];
  const newStep: Step = "step-2";

  // Act
  const test = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(test).toEqual({ step: "step-2", previousSteps: ["step-1"] });
});

test("should append properly when there is already history", () => {
  // Arrange
  const currentStep: Step = "step-4";
  const previousSteps: Step[] = ["step-1", "step-2", "step-3"];
  const newStep: Step = "success-step";

  // Act
  const test = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(test).toEqual({ step: "success-step", previousSteps: ["step-1", "step-2", "step-3", "step-4"] });
});

test("should trigger the safeguard and return the same state if navigating to the current step", () => {
  // Arrange
  const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  const currentStep: Step = "step-4";
  const previousSteps: Step[] = ["step-1", "step-2", "step-3"];
  const newStep: Step = "step-4"; // Same as current

  // Act
  const result = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(result).toEqual({ step: "step-4", previousSteps: ["step-1", "step-2", "step-3"] });
  expect(consoleSpy).toHaveBeenCalledWith("You are trying to navigate to the same page.");
});
