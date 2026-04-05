// Node modules
import { useState } from "react";

// Project files
import type { Step } from "./helpers/Step";
import IntroStep from "./intro-step/IntroStep";
import Step1 from "./step-1/Step1";
import Step2 from "./step-2/Step2";
import Success from "./success/Success";

export default function FormManager() {
  // Local state
  const [step, setStep] = useState<Step>("intro-step");

  return (
    <div>
      {step === "intro-step" && <IntroStep setStep={setStep} />}
      {step === "step-1" && <Step1 setStep={setStep} />}
      {step === "step-2" && <Step2 setStep={setStep} />}
      {step === "success" && <Success setStep={setStep} />}
    </div>
  );
}
