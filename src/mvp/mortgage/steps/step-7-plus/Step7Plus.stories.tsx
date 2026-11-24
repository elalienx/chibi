// Project files
import preview from "../../../../../.storybook/preview";
import Step7Plus from "./Step7Plus";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 7 Plus: Household (all open)",
  component: Step7Plus,
});

// Stories
export const Default = meta.story({
  name: "Step 7 Plus: Household (all open)",
  render: () => <Step7Plus />,
});

export default meta;
