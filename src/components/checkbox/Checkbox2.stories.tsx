// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Checkbox from "./Checkbox";

type Story = StoryObj<typeof Checkbox>;

// Properties
const schema = v.object({
  terms: v.optional(v.boolean()),
});

const meta: Meta<typeof Checkbox> = {
  title: "Form fields/Checkbox 2",
  component: Checkbox,
};

// Stories
export const Unchecked: Story = {
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur", initialInput: { terms: false } });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Checkbox form={form} id="terms">
          I accept the terms and conditions
        </Checkbox>
      </Form>
    );
  },
};

export const Checked: Story = {
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur", initialInput: { terms: true } });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Checkbox form={form} id="terms">
          I accept the terms and conditions
        </Checkbox>
      </Form>
    );
  },
};

export default meta;
