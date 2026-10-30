// Project files
import preview from "../../../../.storybook/preview";
import ModalManager from "components/modal-manager/ModalManager";
import PEPInfoModal from "./components/PEPInfoModal";
import PEPWarningModal from "./components/PEPWarningModal";
import Step3 from "./Step3";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 3: Personal info",
  component: Step3,
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
  name: "Step 3: Personal info",
  render: () => (
    <>
      <Step3 />
      <ModalManager /> {/* Normally lives in FormManager, added here to test the PEP modal */}
    </>
  ),
});

export const PEPInfoModalStory = meta.story({
  name: "PEP info modal",
  render: () => <PEPInfoModal onClose={onClose} />,
});

export const PEPWarningModalStory = meta.story({
  name: "PEP warning modal",
  render: () => <PEPWarningModal onClose={onClose} onContinue={onContinue} />,
});

export default meta;
