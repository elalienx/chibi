// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import Checkbox from "./Checkbox";

// Metadata
const meta = preview.meta({
  title: "Form fields/Checkbox",
  component: Checkbox,
});

// Properties
const terms = { terms: v.optional(v.boolean()) };
const schema = v.object(terms);

// Stories
export const Unchecked = meta.story({
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
});

export const Checked = meta.story({
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
});

export const CheckboxWithNoIdError = meta.story({
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
});

export const CheckboxWithNoFormError = meta.story({
  name: "Checbox (form error)",
  render: () => <Checkbox>I accept the terms and conditions</Checkbox>,
});

export default meta;
