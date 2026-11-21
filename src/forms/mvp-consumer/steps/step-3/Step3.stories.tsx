// Project files
import preview from "../../../../../.storybook/preview";
import ApplicantHeader from "./components/ApplicantHeader";
import CoApplicantHeader from "./components/CoApplicantHeader";
import RemoveCoApplicantModal from "./components/RemoveCoApplicantModal";
import Step3 from "./Step3";

// Metadata
const meta = preview.meta({
  title: "MVP Consumer/Step 3: Personal info",
  component: Step3,
});

// Methods
function onRemove() {
  alert("Dummy method. In real life this removes the co-applicant");
}

function onClose() {
  alert("On close...");
}

// Stories
export const SingleApplicant = meta.story({
  name: "Single applicant",
  render: () => <Step3 hasCoApplicant={false} />,
});

export const WithCoApplicant = meta.story({
  name: "With co-applicant",
  render: () => <Step3 hasCoApplicant={true} />,
});

export const ApplicantHeaderStory = meta.story({
  name: "Applicant header",
  render: () => <ApplicantHeader />,
});

export const CoApplicantHeaderStory = meta.story({
  name: "Co-applicant header",
  render: () => <CoApplicantHeader onRemove={onRemove} />,
});

export const RemoveCoApplicantModalStory = meta.story({
  name: "Remove co-applicant modal",
  render: () => <RemoveCoApplicantModal onClose={onClose} onRemove={onRemove} />,
});

export default meta;
