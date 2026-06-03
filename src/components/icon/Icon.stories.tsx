// Project files
import preview from "../../../.storybook/preview";
import Icon from "./Icon";

// Metadata
const meta = preview.meta({
  title: "Components/Icon",
  component: Icon,
});

// Stories
export const Default = meta.story({
  name: "Icon",
  argTypes: {
    name: {
      control: { type: "select" },
      options: ["arrow-left", "arrow-right", "chevron-down", "circle-info", "x-mark", "an invalid icon name..."],
    },
  },
  args: { name: "circle-info" },
  render: ({ name }) => <Icon name={name} />,
});
