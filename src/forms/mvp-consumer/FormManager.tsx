// Project files
import ModalManager from "components/modal-manager/ModalManager";
import IntroStep from "./-intro-step/IntroStep";
import Step2 from "./-step-2/Step2";
import Step3 from "./-step-3/Step3";
import Success from "./-success-step/Success";
import useApplication from "./state/useApplication";
import useFormNavigation from "./state/useFormNavigation";

export default function FormManager() {
  // Global state
  const { application } = useApplication();
  const { step } = useFormNavigation();

  // Derived state
  const hasCoApplicant = application.has_co_applicant;

  return (
    <>
      {step === "intro-step" && <IntroStep />}
      {step === "step-2" && <Step2 />}
      {step === "step-3" && <Step3 hasCoApplicant={hasCoApplicant} />}
      {step === "success-step" && <Success hasCoApplicant={hasCoApplicant} />}

      {/* Lives at the root so any step can open a modal */}
      <ModalManager />
    </>
  );
}
