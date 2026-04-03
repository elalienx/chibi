// Node modules
import { useState } from "react";

// Project files
import Step1 from "./step-1/Step1";
import Step2 from "./step-2/Step2";
import Step3 from "./step-3/Step3";
import Success from "./success/Success";

type Step = "step1" | "step2" | "step3" | "success";

export default function FormManager() {
  // Local state
  const [step, setStep] = useState<Step>("step1");

  return (
    <div>
      {step === "step1" && <Step1 onContinue={() => setStep("step2")} />}
      {step === "step2" && <Step2 onContinue={() => setStep("step3")} />}
      {step === "step3" && <Step3 onContinue={() => setStep("success")} />}
      {step === "success" && <Success onContinue={() => setStep("step1")} />}
    </div>
  );
}
