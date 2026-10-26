// Project files
import preview from "../../../../.storybook/preview";
import BankIDLogin from "./BankIDLogin";

// Metadata
const meta = preview.meta({
  title: "MVP Business/BankID login",
  component: BankIDLogin,
});

// Stories
export const Default = meta.story({
  name: "BankID login",
  render: () => <BankIDLogin />,
});

export default meta;
