// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import ToggleGroup from "./ToggleGroup";
import Label from "components/label/Label";
import ToggleOption from "components/toggle-option/ToggleOption";

// Metadata
const meta = preview.meta({
  title: "Form fields/Toggle Group",
  component: ToggleGroup,
});

// Properties
const source_of_income = v.pipe(v.string(), v.nonEmpty("Choose a source of income."));
const schema = v.object({ source_of_income });

// Stories
export const Default = meta.story({
  name: "ToggleGroup",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <ToggleGroup form={form} id="source_of_income">
          <Label>Source of income</Label>
          <ToggleOption value="savings">Savings</ToggleOption>
          <ToggleOption value="salary">Salary</ToggleOption>
          <ToggleOption value="inheritance">Inheritance</ToggleOption>
          <ToggleOption value="pension">Pension</ToggleOption>
          <ToggleOption value="other">Other</ToggleOption>
        </ToggleGroup>
      </Form>
    );
  },
});

export default meta;
