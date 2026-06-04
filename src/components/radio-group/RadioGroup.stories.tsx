// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import RadioGroup from "./RadioGroup";
import Label from "components/label/Label";
import RadioOption from "components/radio-option/RadioOption";

type Story = StoryObj<typeof RadioGroup>;

// Metadata
const meta: Meta<typeof RadioGroup> = {
  title: "Form fields/RadioGroup",
  component: RadioGroup,
};

// Proeprties
const property_type = v.pipe(v.string("Choose a property type"));
const schema = v.object({ property_type });

// Stories
export const InputFieldText: Story = {
  name: "Input field (text)",
  render: () => {
    // Local state
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
    });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <RadioGroup form={form} id="property_type">
          <Label>Property type</Label>
          <RadioOption value={"apartment"}>Apartment</RadioOption>
          <RadioOption value={"vacation_home"}>Vacation home</RadioOption>
          <RadioOption value={"house"}>House</RadioOption>
        </RadioGroup>
      </Form>
    );
  },
};

export default meta;
