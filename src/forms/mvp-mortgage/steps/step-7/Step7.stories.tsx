// Project files
import preview from "../../../../../.storybook/preview";
import ChildForm from "./components/ChildForm";
import EditCard from "./components/EditCard";
import Step7 from "./Step7";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 7: Household",
  component: Step7,
});

// Methods
function onCancel() {
  alert("Dummy method. In real life this closes the child form");
}

function onSave(values: object) {
  alert(`Saved child: ${JSON.stringify(values)}`);
}

function onEdit() {
  alert("Dummy method. In real life this opens the child form");
}

function onDelete() {
  alert("Dummy method. In real life this removes the child");
}

// Properties
const child = {
  child_age: 4,
  child_receives_allowance: true,
  child_lives_with_applicant: true,
  child_shared_custody: false,
  child_maintenance: "pays" as const,
};

// Stories
export const Default = meta.story({
  name: "Step 7: Household",
  render: () => <Step7 />,
});

export const ChildFormStory = meta.story({
  name: "Child Form",
  render: () => <ChildForm childNumber={1} onCancel={onCancel} onSave={onSave} />,
});

export const EditCardStory = meta.story({
  name: "Edit Card",
  render: () => <EditCard childNumber={1} child={child} onEdit={onEdit} onDelete={onDelete} />,
});

export default meta;
