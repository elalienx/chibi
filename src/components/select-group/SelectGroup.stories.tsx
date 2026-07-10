// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import SelectGroup from "./SelectGroup";
import Label from "components/label/Label";
import Select from "components/select/Select";
import SelectOption from "components/select-option/SelectOption";

// Metadata
const meta = preview.meta({
  title: "Form fields/Select Group",
  component: SelectGroup,
});

// Properties
const source_of_income = v.pipe(v.string(), v.nonEmpty("Choose a source of income."));
const schema = v.object({ source_of_income });

// Stories
export const Default = meta.story({
  name: "SelectGroup",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <SelectGroup form={form} id="source_of_income">
          <Label>Source of income</Label>
          <Select>Choose an option</Select>
          <SelectOption value="savings">Savings</SelectOption>
          <SelectOption value="salary">Salary</SelectOption>
          <SelectOption value="inheritance">Inheritance</SelectOption>
          <SelectOption value="pension">Pension</SelectOption>
          <SelectOption value="other">Other</SelectOption>
        </SelectGroup>
      </Form>
    );
  },
});

export default meta;
