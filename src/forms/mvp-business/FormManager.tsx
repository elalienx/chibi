// Project files
import BankIDLogin from "./steps/bank-id-login/BankIDLogin";
import Step1 from "./steps/step-1/Step1";
import Step2 from "./steps/step-2/Step2";
import Step3 from "./steps/step-3/Step3";
import Step4 from "./steps/step-4/Step4";
import Step5 from "./steps/step-5/Step5";
import Step6AB from "./steps/step-6-ab/Step6AB";
import Step6EN from "./steps/step-6-en/Step6EN";
import Success from "./steps/success-step/Success";
import useFormNavigation from "./state/useFormNavigation";

export default function FormManager() {
  // Global state
  const { step } = useFormNavigation();

  return (
    <>
      {step === "step-1" && <Step1 />}
      {step === "step-2" && <Step2 />}
      {step === "bank-id-login" && <BankIDLogin />}
      {step === "step-3" && <Step3 />}
      {step === "step-4" && <Step4 />}
      {step === "step-5" && <Step5 />}
      {step === "step-6-ab" && <Step6AB />}
      {step === "step-6-en" && <Step6EN />}
      {step === "success-step" && <Success />}
    </>
  );
}
