// Project files
import preview from "../../../../../.storybook/preview";
import LoanDetailsEdit from "./LoanDetailsEdit";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan Details Edit",
  component: LoanDetailsEdit,
});

// Stories
export const Default = meta.story({
  name: "Loan Details Edit",
  render: () => <LoanDetailsEdit />,
});

export default meta;
