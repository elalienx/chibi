// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Checkbox from "./Checkbox";

type Story = StoryObj<typeof Checkbox>;

// Reusable Decorator Component
const FormPage = (schema: any, id: string) => (_StoryComponent: any, context: any) => {
  const form = useForm({ schema, validate: "blur", revalidate: "blur" });

  return <Checkbox {...context.args} form={form} id={id} />;
};

// Settings
const meta: Meta<typeof Checkbox> = {
  title: "Form fields/Checkbox",
  component: Checkbox,
  args: {
    children: "Accept terms and conditions",
  },
};
export default meta;

// Properties
const schema_pep = v.object({ is_pep: v.pipe(v.optional(v.boolean(), true)) });
const schema_terms = v.object({ accept_terms: v.pipe(v.optional(v.boolean(), false)) });

// Stories
export const Default: Story = {
  decorators: [FormPage(schema_pep, "is_pep")],
};

export const Checked: Story = {
  decorators: [FormPage(schema_terms, "accept_terms")],
};
