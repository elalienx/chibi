// Project files
import ModalManager from "components/modal-manager/ModalManager";
import IntroStep from "./-intro-step/IntroStep";
import Step2 from "./-step-2/Step2";
import useFormNavigation from "./state/useFormNavigation";

export default function FormManager() {
  // Global state
  const { step } = useFormNavigation();

  return (
    <>
      {step === "intro-step" && <IntroStep />}
      {step === "step-2" && <Step2 />}

      {/* Lives at the root so any step can open a modal */}
      <ModalManager />
    </>
  );
}
