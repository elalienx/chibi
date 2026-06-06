// Node modules
import { it, expect, vi, afterEach } from "vitest";

// Project files
import goPreviousStep from "./goPreviousStep";
import type { Step } from "forms/road-to-mvp-2/types/Step";

afterEach(() => {
  vi.restoreAllMocks();
});

it("should go to the previous step and remove it from history", () => {
  // Arrange
  const currentStep: Step = "step-3";
  const previousSteps: Step[] = ["step-1", "step-2"];

  // Act
  const test = goPreviousStep(currentStep, previousSteps);

  // Assert
  expect(test).toEqual({ step: "step-2", previousSteps: ["step-1"] });
});

it("should trigger the safeguard and return the exact same state if history is empty", () => {
  // Arrange
  const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  const currentStep: Step = "step-1" as Step;
  const previousSteps: Step[] = [];

  // Act
  const result = goPreviousStep(currentStep, previousSteps);

  // Assert
  expect(result).toEqual({ step: "step-1", previousSteps: [] });
  expect(consoleSpy).toHaveBeenCalledWith("You cannot navigate backward anymore.");
});
