// Project files
import IntroStep from "./-intro-step/IntroStep";
import Step4 from "./-step-4/Step4";
import Success from "./-success-step/Success";
import useFormNavigation from "./state/useFormNavigation";
import "./utils.css";

export default function FormManager() {
  // Global state
  const { step } = useFormNavigation();

  return (
    <>
      {step === "intro-step" && <IntroStep />}
      {step === "step-4" && <Step4 />}
      {step === "success-step" && <Success />}
    </>
  );
}
