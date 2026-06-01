// Node modules
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Checkbox from "./Checkbox";

type Story = StoryObj<typeof Checkbox>;

// Reusable Decorator Component
const FormWrapper = (schema: any, id: string) => (StoryComponent: any, context: any) => {
  // 1. Create a normal React component inside the decorator
  const ComponentWithForm = () => {
    const form = useForm({ schema, validate: 'blur', revalidate: 'blur' });
    
    // 2. Directly pass form and id as standard React props to the component.
    // This bypasses Storybook's 'args' object tracking so it doesn't crash trying to read the form state.
    return (
      <Checkbox 
        {...context.args} 
        form={form} 
        id={id} 
      />
    );
  };

  return <ComponentWithForm />;
};

// Settings
const meta: Meta<typeof Checkbox> = {
  title: "Form fields/Checkbox",
  component: Checkbox,
  args: {
    children: "Accept terms and conditions",
  },
  // 3. Inform Storybook's doc gen tool to ignore the form property entirely
  argTypes: {
    form: { table: { disable: true } },
  }
};
export default meta;

// Properties
const schema_pep = v.object({ is_pep: v.pipe(v.optional(v.boolean(), true)) });
const schema_terms = v.object({ accept_terms: v.pipe(v.optional(v.boolean(), false)) });

// Stories
export const Default: Story = {
  decorators: [FormWrapper(schema_pep, "is_pep")]
};

export const Checked: Story = {
  decorators: [FormWrapper(schema_terms, "accept_terms")]
};