// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import SelectorGroup from "./SelectorGroup";
import Label from "components/label/Label";
import SelectorOption from "components/selector-option/SelectorOption";

// Metadata
const meta = preview.meta({
  title: "Form fields/Selector Group",
  component: SelectorGroup,
});

// Properties
const source_of_income = v.pipe(v.string(), v.nonEmpty("Choose a source of income."));
const schema = v.object({ source_of_income });

// Stories
export const Default = meta.story({
  name: "SelectorGroup",
  render: () => {
    // Local state
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <SelectorGroup form={form} id="source_of_income">
          <Label>Source of income</Label>
          <SelectorOption value="savings">Savings</SelectorOption>
          <SelectorOption value="salary">Salary</SelectorOption>
          <SelectorOption value="inheritance">Inheritance</SelectorOption>
          <SelectorOption value="pension">Pension</SelectorOption>
          <SelectorOption value="other">Other</SelectorOption>
        </SelectorGroup>
      </Form>
    );
  },
});

export default meta;
