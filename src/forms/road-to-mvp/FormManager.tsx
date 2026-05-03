// Node modules
import { useState } from "react";

// Project files
import IntroStep from "./-intro-step/IntroStep";
import Step1 from "./-step-1/Step1";
import Step2 from "./-step-2/Step2";
import Success from "./-success-step/Success";
import useApplication from "./state/useApplication";
import type { Step } from "./types/Step";

export default function FormManager() {
  // Global state
  const { application } = useApplication();

  // Local state
  const [step, setStep] = useState<Step>("intro-step");

  // Properties
  const propertyType = application.property_type;

  return (
    <div>
      {step === "intro-step" && <IntroStep setStep={setStep} />}
      {step === "step-1" && <Step1 setStep={setStep} />}
      {step === "step-2" && <Step2 setStep={setStep} propertyType={propertyType} />}
      {step === "success" && <Success setStep={setStep} />}
    </div>
  );
}
