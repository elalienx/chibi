// Node modules
import { it, expect, vi, afterEach } from "vitest";

// Project files
import setStep from "./setStep";
import type { Step } from "forms/road-to-mvp-2/types/Step";

afterEach(() => {
  vi.restoreAllMocks();
});

it("should set the new step and append the current step to history", () => {
  // Arrange
  const currentStep: Step = "step-1";
  const previousSteps: Step[] = [];
  const newStep: Step = "step-2";

  // Act
  const test = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(test).toEqual({ step: "step-2", previousSteps: ["step-1"] });
});

it("should append properly when there is already history", () => {
  // Arrange
  const currentStep: Step = "step-2";
  const previousSteps: Step[] = ["step-1"];
  const newStep: Step = "step-3";

  // Act
  const test = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(test).toEqual({ step: "step-3", previousSteps: ["step-1", "step-2"] });
});

it("should trigger the safeguard and return the same state if navigating to the current step", () => {
  // Arrange
  const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  const currentStep: Step = "step-2";
  const previousSteps: Step[] = ["step-1"];
  const newStep: Step = "step-2"; // Same as current

  // Act
  const result = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(result).toEqual({ step: "step-2", previousSteps: ["step-1"] });
  expect(consoleSpy).toHaveBeenCalledWith("You are trying to navigate to the same page.");
});
