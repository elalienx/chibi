// Project files
import preview from "../../../../../.storybook/preview";
import LoanView from "./LoanView";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan View",
  component: LoanView,
});

// Methods
function onEdit() {
  alert("Dummy method. In real life this trigger an edit");
}

// Stories
export const Default = meta.story({
  name: "Loan View",
  render: () => <LoanView amount={600_000} period={2} onEdit={onEdit} />,
});

export default meta;
