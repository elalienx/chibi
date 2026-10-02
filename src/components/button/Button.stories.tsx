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
// -- Primary
export const Primary = meta.story({
  name: "Primary",
  render: () => <Button onClick={onClick}>Hello</Button>,
});

export const PrimaryWithIcon = meta.story({
  name: "Primary with icon",
  render: () => (
    <Button onClick={onClick}>
      Hello
      <Icon name="arrow-right" />
    </Button>
  ),
});

export const PrimaryWithIconLeft = meta.story({
  name: "Primary with icon (left)",
  render: () => (
    <Button onClick={onClick}>
      <Icon name="arrow-left" />
      Hello
    </Button>
  ),
});

// -- Secondary
export const Secondary = meta.story({
  name: "Secondary",
  render: () => (
    <Button onClick={onClick} variant="secondary">
      Hello
    </Button>
  ),
});

export const SecondaryWithIcon = meta.story({
  name: "Secondary with icon",
  render: () => (
    <Button onClick={onClick} variant="secondary">
      Hello
      <Icon name="arrow-right" />
    </Button>
  ),
});

export const SecondaryWithIconLeft = meta.story({
  name: "Secondary with icon (left)",
  render: () => (
    <Button onClick={onClick} variant="secondary">
      <Icon name="arrow-left" />
      Hello
    </Button>
  ),
});

// -- Tertiary
export const Tertiary = meta.story({
  name: "Tertiary",
  render: () => (
    <Button onClick={onClick} variant="tertiary">
      Hello
    </Button>
  ),
});

export const TertiaryWithIcon = meta.story({
  name: "Tertiary with icon",
  render: () => (
    <Button onClick={onClick} variant="tertiary">
      Hello
      <Icon name="arrow-right" />
    </Button>
  ),
});

export const TertiaryWithIconLeft = meta.story({
  name: "Tertiary with icon (left)",
  render: () => (
    <Button onClick={onClick} variant="tertiary">
      <Icon name="arrow-left" />
      Hello
    </Button>
  ),
});

// -- Borderless
export const Borderless = meta.story({
  name: "Borderless",
  render: () => (
    <Button onClick={onClick} variant="borderless">
      Hello
    </Button>
  ),
});

export const BorderlessWithIcon = meta.story({
  name: "Borderless with icon",
  render: () => (
    <Button onClick={onClick} variant="borderless">
      Hello
      <Icon name="arrow-right" />
    </Button>
  ),
});

export const BorderlessWithIconLeft = meta.story({
  name: "Borderless with icon (left)",
  render: () => (
    <Button onClick={onClick} variant="borderless">
      <Icon name="arrow-left" />
      Hello
    </Button>
  ),
});
