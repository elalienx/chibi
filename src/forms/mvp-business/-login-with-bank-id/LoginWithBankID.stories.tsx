// Project files
import preview from "../../../../.storybook/preview";
import LoginWithBankID from "./LoginWithBankID";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Login with BankID",
  component: LoginWithBankID,
});

// Stories
export const Default = meta.story({
  name: "Login with BankID",
  render: () => <LoginWithBankID />,
});

export default meta;
