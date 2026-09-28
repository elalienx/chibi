// Project files
import preview from "../../../../../.storybook/preview";
import LoanDetailsClosed from "./LoanDetailsClosed";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan Details Closed",
  component: LoanDetailsClosed,
});

// Stories
export const Default = meta.story({
  name: "Loan Details Closed",
  render: () => <LoanDetailsClosed />,
});

export default meta;
