// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import SelectorGroup from "./SelectorGroup";
import Label from "components/label/Label";
import SelectorOption from "components/selector-option/SelectorOption";

type Story = StoryObj<typeof SelectorGroup>;

// Metadata
const meta: Meta<typeof SelectorGroup> = {
  title: "Form fields/Selector Group",
  component: SelectorGroup,
};

// Properties
const source_of_income = v.string("Choose a source of income.");
const schema = v.object({ source_of_income });

// Stories
export const Default: Story = {
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
};

export default meta;
