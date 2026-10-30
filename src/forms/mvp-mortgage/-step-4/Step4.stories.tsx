// Project files
import preview from "../../../../.storybook/preview";
import ModalManager from "components/modal-manager/ModalManager";
import PEPInfoModal from "./components/PEPInfoModal";
import PEPWarningModalCoApplicant from "./components/PEPWarningModalCoApplicant";
import Step4 from "./Step4";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 4: Co-applicant info",
  component: Step4,
});

// Methods
function onClose() {
  alert("On close...");
}

function onContinue() {
  alert("Dummy method. In real life this continues with the application");
}

// Stories
export const Default = meta.story({
  name: "Step 4: Co-applicant info",
  render: () => (
    <>
      <Step4 />
      <ModalManager /> {/* Normally lives in FormManager, added here to test the PEP modals */}
    </>
  ),
});

export const PEPInfoModalStory = meta.story({
  name: "PEP info modal",
  render: () => <PEPInfoModal onClose={onClose} />,
});

export const PEPWarningModalCoApplicantStory = meta.story({
  name: "PEP warning modal (co-applicant)",
  render: () => <PEPWarningModalCoApplicant onClose={onClose} onContinue={onContinue} />,
});

export default meta;
