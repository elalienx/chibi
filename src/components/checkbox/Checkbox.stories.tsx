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

// Properties
const terms = { terms: v.optional(v.boolean()) };
const schema = v.object(terms);

// Stories
export const Unchecked: Story = {
  name: "Unchecked",
  render: () => {
    // Local state
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
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

export const Checked: Story = {
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

export const CheckboxWithNoIdError: Story = {
  name: "Checkbox (id error)",
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

export const CheckboxWithNoFormError: Story = {
  name: "Checbox (form error)",
  render: () => <Checkbox>I accept the terms and conditions</Checkbox>,
};

export default meta;
