// Node modules
import { useRef, useState } from "react";
import { Form, handleSubmit, useForm, type FormStore } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import SubForm from "./SubForm";
import { mainSchema } from "./schema";

export default function FormPage() {
  // Local state
  const form = useForm({ schema: mainSchema, validate: "blur", revalidate: "blur" });
  const [subFormIds, setSubFormIds] = useState<number[]>([]); // Stable ids, so deleting a sub-form keeps the inputs of the others
  const subForms = useRef(new Set<FormStore>()); // Filled by each sub-form ref, used to validate them all at once

  // Methods
  // Ref callback: React calls it with the sub-form on mount, and calls the returned cleanup on unmount.
  function registerSubForm(subForm: FormStore | null) {
    if (!subForm) return;

    subForms.current.add(subForm);

    return () => {
      subForms.current.delete(subForm); // Braces on purpose: React cleanups must return nothing, and delete() returns a boolean.
    };
  }

  async function validateSubForms() {
    const forms = [...subForms.current];

    // Submit instead of validate(), because Chibi inputs only show their errors once their form is submitted.
    await Promise.all(forms.map((subForm) => handleSubmit(subForm, () => {})()));

    return forms.every((subForm) => subForm.isValid);
  }

  async function addSubForm() {
    const isValid = await validateSubForms();
    const nextId = Math.max(0, ...subFormIds) + 1;

    if (isValid) setSubFormIds([...subFormIds, nextId]);
  }

  function deleteSubForm(deleteId: number) {
    const updatedIds = subFormIds.filter((id) => id !== deleteId);

    setSubFormIds(updatedIds);
  }

  async function submitForm(values: v.InferOutput<typeof mainSchema>) {
    const isValid = await validateSubForms();

    if (isValid) alert(`Success! ${values.company_name} has ${subFormIds.length} employee(s)`);
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Sub-form open tests</h4>
      </header>

      <section>
        <InputField form={form} id={["company_name"]}>
          <Label>Company name</Label>
          <Input type="text" placeholder="Lendo" />
        </InputField>

        {subFormIds.map((id, index) => (
          <SubForm
            key={id}
            id={id}
            title={`Employee ${index + 1}`}
            onDelete={() => deleteSubForm(id)}
            ref={registerSubForm}
          />
        ))}

        <Button variant="secondary" onClick={addSubForm}>
          Add employee <Icon name="plus" />
        </Button>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
