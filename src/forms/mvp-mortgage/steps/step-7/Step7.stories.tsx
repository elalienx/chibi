// Project files
import preview from "../../../../../.storybook/preview";
import Step7 from "./Step7";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 7: Household",
  component: Step7,
});

// Stories
export const Default = meta.story({
  name: "Step 7: Household",
  render: () => <Step7 />,
});

export default meta;
