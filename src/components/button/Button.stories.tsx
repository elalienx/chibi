// Project files
import preview from "../../../.storybook/preview";
import Button from "./Button";
import Icon from "components/icon/Icon";

// Metadata
const meta = preview.meta({
  title: "Components/Button",
  component: Button,
});

// Methods
function onClick() {
  alert("Miku Miku oe oe!");
}

// Stories
export const Primary = meta.story({
  name: "Primary",
  args: {
    children: <>Click me</>,
    type: "button",
    onClick: onClick,
  },
});

export const PrimaryWithIcon = meta.story({
  name: "Primary with icon",
  args: {
    children: (
      <>
        Click me <Icon name="arrow-right" />
      </>
    ),
    type: "button",
    onClick: onClick,
  },
});
