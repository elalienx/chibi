// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Checkbox from "./Checkbox";

type Story = StoryObj<typeof Checkbox>;

// Properties
// Fixed Valibot schema (removed v.pipe) and set default to false for the Unchecked state
const schema = v.object({
  is_pep: v.optional(v.boolean(), false),
});

const meta: Meta<typeof Checkbox> = {
  title: "Form fields/Checkbox 2",
  component: Checkbox,
  decorators: [
    (Story) => {
      // Local state
      const form = useForm({ schema, validate: "blur", revalidate: "blur" });

      return (
        <Form of={form} onSubmit={() => alert("Success")}>
          <Story />
        </Form>
      );
    },
  ],
};

// Stories
export const Unchecked: Story = {
  render: ({ form }) => (
    <Checkbox id="is_pep" form={form}>
      I accept the terms and conditions
    </Checkbox>
  ),
};

export default meta;
