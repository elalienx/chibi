// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../../../.storybook/preview";
import ChildForm from "./components/ChildForm";
import Counter from "./components/Counter";
import EditCard from "./components/EditCard";
import Step7 from "./Step7";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 7: Household",
  component: Step7,
});

// Methods
function onCancel() {
  alert("Dummy method. In real life this closes the child form");
}

function onSave(values: object) {
  alert(`Saved child: ${JSON.stringify(values)}`);
}

function onEdit() {
  alert("Dummy method. In real life this opens the child form");
}

function onDelete() {
  alert("Dummy method. In real life this removes the child");
}

// Properties
const child = {
  child_age: 4,
  child_receives_allowance: true,
  child_lives_with_applicant: true,
  child_shared_custody: false,
  child_maintenance: "pays" as const,
};

const counterSchema = v.object({ household_adults: v.pipe(v.string(), v.toNumber()) });

// Stories
export const Default = meta.story({
  name: "Step 7: Household",
  render: () => <Step7 />,
});

export const ChildFormStory = meta.story({
  name: "Child Form",
  render: () => <ChildForm childNumber={1} onCancel={onCancel} onSave={onSave} />,
});

export const EditCardStory = meta.story({
  name: "Edit Card",
  render: () => <EditCard childNumber={1} child={child} onEdit={onEdit} onDelete={onDelete} />,
});

export const CounterStory = meta.story({
  name: "Counter",
  render: () => {
    const form = useForm({ schema: counterSchema, initialInput: { household_adults: "1" } });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <Counter id="household_adults" form={form} label="Hur många vuxna är ni i hushållet?" min={1} max={15} />
      </Form>
    );
  },
});

export default meta;
