// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import RadioGroup from "./RadioGroup";
import Label from "components/label/Label";
import RadioOption from "components/radio-option/RadioOption";

// Metadata
const meta = preview.meta({
  title: "Form fields/Radio Group",
  component: RadioGroup,
});

// Properties
const source_of_income = v.pipe(v.string(), v.nonEmpty("Choose a source of income."));
const schema = v.object({ source_of_income });

// Stories
export const Default = meta.story({
  name: "Radio Group",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <RadioGroup form={form} id="source_of_income">
          <Label>Source of income</Label>
          <RadioOption value="savings">Savings</RadioOption>
          <RadioOption value="salary">Salary</RadioOption>
          <RadioOption value="inheritance">Inheritance</RadioOption>
          <RadioOption value="pension">Pension</RadioOption>
          <RadioOption value="other">Other</RadioOption>
        </RadioGroup>
      </Form>
    );
  },
});

export default meta;
