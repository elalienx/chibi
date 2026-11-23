// Project files
import preview from "../../../../.storybook/preview";
import ConsumerAgencyWarning from "./ConsumerAgencyWarning";

// Metadata
const meta = preview.meta({
  title: "MVP Consumer/Consumer agency warning",
  component: ConsumerAgencyWarning,
});

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <ConsumerAgencyWarning />,
});

export default meta;
