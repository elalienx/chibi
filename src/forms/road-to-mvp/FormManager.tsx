// Node modules
import { useState } from "react";

// Project files
import type { Step } from "./helpers/Step";
import Step1 from "./step-1/Step1";
import Step2 from "./step-2/Step2";
import Step3 from "./step-3/Step3";
import Success from "./success/Success";

export default function FormManager() {
  // Local state
  const [step, setStep] = useState<Step>("step1");

  return (
    <div>
      {step === "step1" && <Step1 setStep={setStep} />}
      {step === "step2" && <Step2 setStep={setStep} />}
      {step === "step3" && <Step3 setStep={setStep} />}
      {step === "success" && <Success setStep={setStep} />}
    </div>
  );
}
