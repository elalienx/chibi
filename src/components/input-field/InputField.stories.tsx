// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import InputField from "./InputField";
import Label from "components/label/Label";
import Input from "components/input/Input";

type Story = StoryObj<typeof InputField>;

// Metadata
const meta: Meta<typeof InputField> = {
  title: "Form fields/Input Field",
  component: InputField,
};

// Properties
const username = v.pipe(v.string("Must be a valid string"), v.nonEmpty("Enter your name"));
const schema = v.object({ username });

// Stories
export const InputFieldText: Story = {
  name: "Input Field (text)",
  render: () => {
    // Local state
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
    });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <InputField form={form} id="username">
          <Label>Username</Label>
          <Input type="text" placeholder="Hatsume Miku" />
        </InputField>
      </Form>
    );
  },
};

export default meta;
