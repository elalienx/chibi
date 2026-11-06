// Project files
import ModalManager from "components/modal-manager/ModalManager";
import IntroStep from "./-intro-step/IntroStep";
import useFormNavigation from "./state/useFormNavigation";

export default function FormManager() {
  // Global state
  const { step } = useFormNavigation();

  return (
    <>
      {step === "intro-step" && <IntroStep />}

      {/* Lives at the root so any step can open a modal */}
      <ModalManager />
    </>
  );
}
