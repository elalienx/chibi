// Node modules
import { useState } from "react";

// Project files
import type { Step } from "./types/Step";
import IntroStep from "./_intro-step/IntroStep";
import Step1 from "./_step-1/Step1";
import Step2 from "./_step-2/Step2";
import Success from "./_success-step/Success";
import useApplication from "./state/useApplication";

export default function FormManager() {
  // Global state
  const { application } = useApplication();

  // Local state
  const [step, setStep] = useState<Step>("intro-step");

  // Properties
  const isApartment = application.property_type == "apartment";

  return (
    <div>
      {step === "intro-step" && <IntroStep setStep={setStep} />}
      {step === "step-1" && <Step1 setStep={setStep} />}
      {step === "step-2" && <Step2 setStep={setStep} isApartment={isApartment} />}
      {step === "success" && <Success setStep={setStep} />}
    </div>
  );
}
