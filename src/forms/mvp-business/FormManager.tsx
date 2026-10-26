// Project files
import LoginWithBankID from "./-login-with-bank-id/LoginWithBankID";
import Step1 from "./-step-1/Step1";
import Step2 from "./-step-2/Step2";
import Step3 from "./-step-3/Step3";
import Step4 from "./-step-4/Step4";
import Step5 from "./-step-5/Step5";
import Step6AB from "./-step-6-ab/Step6";
import Step6EN from "./-step-6-en/Step6";
import Success from "./-success-step/Success";
import useFormNavigation from "./state/useFormNavigation";

export default function FormManager() {
  // Global state
  const { step } = useFormNavigation();

  return (
    <>
      {step === "step-1" && <Step1 />}
      {step === "step-2" && <Step2 />}
      {step === "login-with-bank-id" && <LoginWithBankID />}
      {step === "step-3" && <Step3 />}
      {step === "step-4" && <Step4 />}
      {step === "step-5" && <Step5 />}
      {step === "step-6-ab" && <Step6AB />}
      {step === "step-6-en" && <Step6EN />}
      {step === "success-step" && <Success />}
    </>
  );
}
