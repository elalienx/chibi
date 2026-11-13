// Project files
import preview from "../../../../../.storybook/preview";
import ChildForm from "./components/ChildForm";
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

// Stories
export const Default = meta.story({
  name: "Step 7: Household",
  render: () => <Step7 />,
});

export const ChildFormStory = meta.story({
  name: "Child Form",
  render: () => <ChildForm childNumber={1} onCancel={onCancel} onSave={onSave} />,
});

export default meta;
