// Node modules
import { useState } from "react";

// Project files
import type { Step } from "./_helpers/Step";
import EntryStep from "./entry-step/EntryStep";
import Step1 from "./step-1/Step1";
import Step2 from "./step-2/Step2";
import Success from "./success/Success";

export default function FormManager() {
  // Local state
  const [step, setStep] = useState<Step>("entry-step");

  return (
    <div>
      {step === "entry-step" && <EntryStep setStep={setStep} />}
      {step === "step-1" && <Step1 setStep={setStep} />}
      {step === "step-2" && <Step2 setStep={setStep} />}
      {step === "success" && <Success setStep={setStep} />}
    </div>
  );
}
