// Project files
import Step1 from "./-step-1/Step1";
import Step2 from "./-step-2/Step2";
import Step3 from "./-step-3/Step3";
import Step4 from "./-step-4/Step4";
import Step5 from "./-step-5/Step5";
import Success from "./-success-step/Success";
import useFormNavigation from "./state/useFormNavigation";
import "./utils.css";

export default function FormManager() {
  // Global state
  const { step } = useFormNavigation();

  return (
    <>
      {step === "step-1" && <Step1 />}
      {step === "step-2" && <Step2 />}
      {step === "step-3" && <Step3 />}
      {step === "step-4" && <Step4 />}
      {step === "step-5" && <Step5 />}
      {step === "success" && <Success />}
    </>
  );
}
