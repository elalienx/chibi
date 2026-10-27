// Project files
import preview from "../../../../.storybook/preview";
import Step6EN from "./Step6EN";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 6: Existing loans (EN)",
  component: Step6EN,
});

// Stories
export const Default = meta.story({
  name: "Step 6: Existing loans (EN)",
  render: () => <Step6EN />,
});

export default meta;
