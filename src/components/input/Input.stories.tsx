// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import Input from "./Input";

// Metadata
const meta = preview.meta({
  title: "Form atoms/Input",
  component: Input,
});

// Properties
const textSchema = v.object({ username: v.pipe(v.string(), v.nonEmpty("Enter your name")) });
const emailSchema = v.object({ email: v.pipe(v.string(), v.email("Enter a valid email")) });
const passwordSchema = v.object({ password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")) });
const numberSchema = v.object({
  loan_amount: v.pipe(
    v.string(),
    v.nonEmpty("Enter your age"),
    v.toNumber("Must be a valid number"),
    v.minValue(10_000, "Must be at least 10 000 SEK"),
    v.maxValue(10_000_000, "Must be less than 10 000 000 SEK"),
  ),
});

// Stories
export const Text = meta.story({
  name: "Text",
  render: () => {
    const form = useForm({ schema: textSchema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Input type="text" placeholder="Hatsume Miku" form={form} id="username" />
      </Form>
    );
  },
});

export const Email = meta.story({
  name: "Email",
  render: () => {
    const form = useForm({ schema: emailSchema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Input type="email" placeholder="hatsume@miku.com" form={form} id="email" />
      </Form>
    );
  },
});

export const Password = meta.story({
  name: "Password",
  render: () => {
    const form = useForm({ schema: passwordSchema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Input type="password" placeholder="Password" form={form} id="password" />
      </Form>
    );
  },
});

export const NumberInput = meta.story({
  name: "Number",
  render: () => {
    const form = useForm({ schema: numberSchema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Input type="number" placeholder="250 000" form={form} id="loan_amount" />
      </Form>
    );
  },
});

export default meta;
