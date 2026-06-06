// Node modules
import { useState } from "react";

// Project files
import Step1 from "./-step-1/Step1";
import Step2 from "./-step-2/Step2";
import Step3 from "./-step-3/Step3";
import Step4 from "./-step-4/Step4";
import Step5 from "./-step-5/Step5";
import Success from "./-success-step/Success";
import type { Step } from "./types/Step";

export default function FormManager() {
  // Local state
  const [step, setStep] = useState<Step>("intro-step");

  return (
    <>
      {step === "step-1" && <Step1 setStep={setStep} />}
      {step === "step-2" && <Step2 setStep={setStep} />}
      {step === "step-3" && <Step3 setStep={setStep} />}
      {step === "step-4" && <Step4 setStep={setStep} />}
      {step === "step-5" && <Step5 setStep={setStep} />}
      {step === "success" && <Success setStep={setStep} />}
    </>
  );
}
