// Project files
import preview from "../../../../../.storybook/preview";
import LoanDetailsOpen from "./LoanDetailsOpen";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan Details Open",
  component: LoanDetailsOpen,
});

// Stories
export const Default = meta.story({
  name: "Loan Details Open",
  render: () => <LoanDetailsOpen />,
});

export default meta;
