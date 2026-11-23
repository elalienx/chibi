// Project files
import preview from "../../../../.storybook/preview";
import BusinessTerms from "./BusinessTerms";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Business terms",
  component: BusinessTerms,
});

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <BusinessTerms />,
});

export default meta;
