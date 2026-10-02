// Project files
import preview from "../../../.storybook/preview";
import Icon from "./Icon";
import icons from "./font-awesome.json";

// Metadata
const meta = preview.meta({
  title: "Components/Icon",
  component: Icon,
});

// Properties
const iconNames = Object.keys(icons).filter((key) => key !== "_default");

// Stories
export const Default = meta.story({
  name: "Icon",
  argTypes: {
    name: {
      control: { type: "radio" },
      options: [...iconNames, "an invalid icon name..."],
    },
  },
  args: { name: "circle-info" },
  render: ({ name }) => <Icon name={name} />,
});
