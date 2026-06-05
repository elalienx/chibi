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
const username = v.pipe(v.string("Must be a valid string"), v.nonEmpty("Enter your name"));
const schema = v.object({ username });

// Stories
export const Default = meta.story({
  name: "Input Field",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

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

export default meta;
