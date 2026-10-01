// Project files
import preview from "../../../../../.storybook/preview";
import LoanDetailsView from "./LoanDetailsView";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan Details View",
  component: LoanDetailsView,
});

// Methods
function onEdit() {
  alert("Dummy method. In real life this trigger an edit");
}

// Stories
export const Default = meta.story({
  name: "Loan Details View",
  render: () => <LoanDetailsView amount={600_000} period={2} onEdit={onEdit} />,
});

export default meta;
