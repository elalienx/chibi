// Project files
import preview from "../../../../.storybook/preview";
import Step6AB from "./Step6AB";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 6: Guarantor (AB)",
  component: Step6AB,
});

// Stories
export const Default = meta.story({
  name: "Step 6: Guarantor (AB)",
  render: () => <Step6AB />,
});

export default meta;
