// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";

// Project files
import Button from "./Button";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export const Primary: Story = {
  render: () => <Button onClick={() => alert("Miku")}>Hello</Button>,
};

export default meta;
