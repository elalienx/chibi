// Project files
import ModalManager from "components/modal-manager/ModalManager";
import IntroStep from "./-intro-step/IntroStep";
import Step1 from "./-step-1/Step1";
import Step2 from "./-step-2/Step2";
import Success from "./-success-step/Success";
import useApplication from "./state/useApplication";
import useFormNavigation from "./state/useFormNavigation";

export default function FormManager() {
  // Global state
  const { application } = useApplication();
  const { step } = useFormNavigation();

  // Derived state
  const propertyType = application.property_type;

  return (
    <>
      {step === "intro-step" && <IntroStep />}
      {step === "step-1" && <Step1 />}
      {step === "step-2" && <Step2 propertyType={propertyType} />}
      {step === "success-step" && <Success />}

      {/* Lives at the root so any step can open a modal */}
      <ModalManager />
    </>
  );
}
