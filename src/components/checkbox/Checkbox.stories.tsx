// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Checkbox from "./Checkbox";

type Story = StoryObj<typeof Checkbox>;

// Metadata
const meta: Meta<typeof Checkbox> = {
  title: "Form fields/Checkbox",
  component: Checkbox,
};

// Proeprties
const schema = v.object({ terms: v.optional(v.boolean()) });

// Stories
export const Story1: Story = {
  name: "Unchecked",
  render: () => {
    // Local state
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
      initialInput: { terms: false },
    });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Checkbox form={form} id="terms">
          I accept the terms and conditions
        </Checkbox>
      </Form>
    );
  },
};

export const Story2: Story = {
  name: "Checked",
  render: () => {
    // Local state
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
      initialInput: { terms: true },
    });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Checkbox form={form} id="terms">
          I accept the terms and conditions
        </Checkbox>
      </Form>
    );
  },
};

export const Story3: Story = {
  name: "Checkbox with no id error",
  render: () => {
    // Local state
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
      initialInput: { terms: true },
    });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Checkbox form={form}>I accept the terms and conditions</Checkbox>
      </Form>
    );
  },
};

export const Story4: Story = {
  name: "Checbox with no form error",
  render: () => <Checkbox>I accept the terms and conditions</Checkbox>,
};

export default meta;
