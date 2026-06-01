// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Checkbox from "./Checkbox";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "Form fields/Checkbox 2",
  component: Checkbox,
};

// Properties
const schema = v.object({ is_pep: v.pipe(v.optional(v.boolean(), true)) });
const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

// Storties
export const Unchecked: Story = {
  render: (form) => (
    <Checkbox form={form} id="is_pep">
      I accept the terms and conditions
    </Checkbox>
  ),
};

export const Checked: Story = {
  render: () => <Checkbox>I accept the terms and conditions</Checkbox>,
};

export default meta;
