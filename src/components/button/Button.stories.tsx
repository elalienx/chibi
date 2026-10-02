// Project files
import preview from "../../../.storybook/preview";
import Button from "./Button";
import Icon from "components/icon/Icon";

// Metadata
const meta = preview.meta({
  title: "Components/Button/Default",
  component: Button,
});

// Methods
function onClick() {
  alert("Miku Miku oe oe!");
}

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <Button onClick={onClick}>Hello</Button>,
});

export const WithIcon = meta.story({
  name: "With icon",
  render: () => (
    <Button onClick={onClick}>
      Hello
      <Icon name="arrow-right" />
    </Button>
  ),
});

export const WithIconLeft = meta.story({
  name: "With icon (left)",
  render: () => (
    <Button onClick={onClick}>
      <Icon name="arrow-left" />
      Hello
    </Button>
  ),
});
