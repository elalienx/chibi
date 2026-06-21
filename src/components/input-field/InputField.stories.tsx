// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import InputField from "./InputField";
import Label from "components/label/Label";
import Input from "components/input/Input";

// Metadata
const meta = preview.meta({
  title: "Form fields/Input Field",
  component: InputField,
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
        <InputField form={form} id="username">
          <Label>Username</Label>
          <Input type="text" placeholder="Hatsume Miku" />
        </InputField>
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
        <InputField form={form} id="email">
          <Label>Email</Label>
          <Input type="email" placeholder="hatsume@miku.com" />
        </InputField>
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
        <InputField form={form} id="password">
          <Label>Password</Label>
          <Input type="password" placeholder="••••••••" />
        </InputField>
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
        <InputField form={form} id="loan_amount">
          <Label>Loan amount</Label>
          <Input type="number" placeholder="250 000" />
        </InputField>
      </Form>
    );
  },
});

export default meta;
