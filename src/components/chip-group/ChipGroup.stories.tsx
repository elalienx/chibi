// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import ChipGroup from "./ChipGroup";
import Label from "components/label/Label";
import ChipOption from "components/chip-option/ChipOption";

// Metadata
const meta = preview.meta({
  title: "Form fields/Chip Group",
  component: ChipGroup,
});

// Properties
const source_of_income = v.pipe(v.string(), v.nonEmpty("Choose a source of income."));
const schema = v.object({ source_of_income });

// Stories
export const Default = meta.story({
  name: "Chip Group",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <ChipGroup form={form} id="source_of_income">
          <Label>Source of income</Label>
          <ChipOption value="savings">Savings</ChipOption>
          <ChipOption value="salary">Salary</ChipOption>
          <ChipOption value="inheritance">Inheritance</ChipOption>
          <ChipOption value="pension">Pension</ChipOption>
          <ChipOption value="other">Other</ChipOption>
        </ChipGroup>
      </Form>
    );
  },
});

export default meta;
