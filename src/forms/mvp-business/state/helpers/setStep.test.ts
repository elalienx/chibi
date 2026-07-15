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
  const currentStep: Step = "intro-step";
  const previousSteps: Step[] = [];
  const newStep: Step = "step-4"; // as we havent mocked steps 1, 2, 3 yet.

  // Act
  const test = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(test).toEqual({ step: "step-4", previousSteps: ["intro-step"] });
});

test("should append properly when there is already history", () => {
  // Arrange
  const currentStep: Step = "step-4";
  const previousSteps: Step[] = ["intro-step"];
  const newStep: Step = "success-step";

  // Act
  const test = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(test).toEqual({ step: "success-step", previousSteps: ["intro-step", "step-4"] });
});

test("should trigger the safeguard and return the same state if navigating to the current step", () => {
  // Arrange
  const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  const currentStep: Step = "step-4";
  const previousSteps: Step[] = ["intro-step"];
  const newStep: Step = "step-4"; // Same as current

  // Act
  const result = setStep(currentStep, previousSteps, newStep);

  // Assert
  expect(result).toEqual({ step: "step-4", previousSteps: ["intro-step"] });
  expect(consoleSpy).toHaveBeenCalledWith("You are trying to navigate to the same page.");
});
