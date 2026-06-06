// Project files
import preview from "../../../.storybook/preview";
import Icon from "./Icon";

// Metadata
const meta = preview.meta({
  title: "Components/Icon",
  component: Icon,
});

// Properties
const icons = ["arrow-left", "arrow-right", "chevron-down", "circle-info", "hashtag", "x-mark", ,];

// Stories
export const Default = meta.story({
  name: "Icon",
  argTypes: {
    name: {
      control: { type: "radio" },
      options: [...icons, "an invalid icon name..."],
    },
  },
  args: { name: "circle-info" },
  render: ({ name }) => <Icon name={name} />,
});
