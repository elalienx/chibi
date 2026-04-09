// Node modules
import { useState } from "react";

// Project files
import type { Step } from "./types/Step";
import IntroStep from "./intro-step/IntroStep";
import Step1 from "./step-1/Step1";
import Step2 from "./step-2/Step2";
import Success from "./success/Success";
import useLoanApplication from "./helpers/useFormStore";

export default function FormManager() {
  // Global state
  const { loanApplication } = useLoanApplication();

  // Local state
  const [step, setStep] = useState<Step>("intro-step");

  // Properties
  const isApartment = loanApplication.property_type == "apartment";

  return (
    <div>
      {step === "intro-step" && <IntroStep setStep={setStep} />}
      {step === "step-1" && <Step1 setStep={setStep} />}
      {step === "step-2" && <Step2 setStep={setStep} isApartment={isApartment} />}
      {step === "success" && <Success setStep={setStep} />}
    </div>
  );
}
