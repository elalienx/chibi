// Project files
import ModalManager from "components/modal-manager/ModalManager";
import IntroStep from "./steps/intro-step/IntroStep";
import Step1 from "./steps/step-1/Step1";
import Step2 from "./steps/step-2/Step2";
import Step3 from "./steps/step-3/Step3";
import Step4 from "./steps/step-4/Step4";
import Step5 from "./steps/step-5/Step5";
import Step6 from "./steps/step-6/Step6";
import Success from "./steps/success-step/Success";
import useApplication from "./state/useApplication";
import useFormNavigation from "./state/useFormNavigation";

export default function FormManager() {
  // Global state
  const { application } = useApplication();
  const { step } = useFormNavigation();

  // Derived state
  const propertyType = application.property_type;
  const employmentType = application.main_employment_type;
  const coEmploymentType = application.co_employment_type;

  return (
    <>
      {step === "intro-step" && <IntroStep />}
      {step === "step-1" && <Step1 />}
      {step === "step-2" && <Step2 propertyType={propertyType} />}
      {step === "step-3" && <Step3 />}
      {step === "step-4" && <Step4 />}
      {step === "step-5" && <Step5 employmentType={employmentType} />}
      {step === "step-6" && <Step6 employmentType={coEmploymentType} />}
      {step === "success-step" && <Success />}

      {/* Lives at the root so any step can open a modal */}
      <ModalManager />
    </>
  );
}
