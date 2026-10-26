// Project files
import preview from "../../../../.storybook/preview";
import Step6 from "./Step6";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 6: Guarantor (AB)",
  component: Step6,
});

// Stories
export const Default = meta.story({
  name: "Step 6: Guarantor (AB)",
  render: () => <Step6 />,
});

export default meta;
