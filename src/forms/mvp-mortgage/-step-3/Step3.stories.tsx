// Project files
import preview from "../../../../.storybook/preview";
import ModalManager from "components/modal-manager/ModalManager";
import Step3 from "./Step3";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 3: Personal info",
  component: Step3,
});

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

export default meta;
