// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";

// Project files
import Button from "./Button";
import Icon from "../icon/Icon";

type Story = StoryObj<typeof Button>;

// Properties
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

// Methods
function onClick() {
  alert("Miku");
}

// Storties
export const Primary: Story = {
  render: () => <Button onClick={onClick}>Hello</Button>,
};

export const PrimaryWithIcon: Story = {
  name: "Primary with icon",
  render: () => (
    <Button onClick={onClick}>
      Hello <Icon name="arrow-right" />
    </Button>
  ),
};

export default meta;
