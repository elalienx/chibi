// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import Input from "components/input/Input";
import Slider from "./Slider";

// Metadata
const meta = preview.meta({
  title: "Form atoms/Slider",
  component: Slider,
});

// Properties
const schema = v.object({ loan_amount: v.pipe(v.string(), v.toNumber()) });
const formSchema = v.object({
  username: v.pipe(v.string(), v.nonEmpty("Enter your name")),
  loan_amount: v.pipe(v.string(), v.toNumber()),
});

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Slider form={form} id="loan_amount" min={50_000} max={3_000_000} step={10_000} />
      </Form>
    );
  },
});

export const InitialValue = meta.story({
  name: "Initial value (20%)",
  render: () => {
    // Local state
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
      initialInput: { loan_amount: "640000" },
    });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Slider form={form} id="loan_amount" min={50_000} max={3_000_000} step={10_000} />
      </Form>
    );
  },
});

export const InsideForm = meta.story({
  name: "Inside a form",
  render: () => {
    // Local state
    const form = useForm({ schema: formSchema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} className="default-form" onSubmit={() => alert("Success")}>
        <section>
          <Input type="text" placeholder="Hatsume Miku" form={form} id="username" />
          <Slider form={form} id="loan_amount" min={50_000} max={3_000_000} step={10_000} />
        </section>
      </Form>
    );
  },
});

export const SliderWithNoIdError = meta.story({
  name: "Slider (id error)",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Slider form={form} min={50_000} max={3_000_000} />
      </Form>
    );
  },
});

export const SliderWithNoFormError = meta.story({
  name: "Slider (form error)",
  render: () => <Slider min={50_000} max={3_000_000} />,
});

export default meta;
