// Project files
import preview from "../../../../../.storybook/preview";
import LoanDetailsView from "./LoanDetailsView";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan Details View",
  component: LoanDetailsView,
});

// Stories
export const Default = meta.story({
  name: "Loan Details View",
  render: () => <LoanDetailsView />,
});

export default meta;
