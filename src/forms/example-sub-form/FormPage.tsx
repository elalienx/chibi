// Node modules
import { useState } from "react";
import { Form, getInput, insert, remove, replace, useFieldArray, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import ViewCard from "./ViewCard";
import SubForm from "./SubForm";
import { mainSchema, type Item } from "./schema";

export default function FormPage() {
  // Local state
  const form = useForm({
    schema: mainSchema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { employees: [] },
  });
  const employees = useFieldArray(form, { path: ["employees"] });
  const [itemIndex, setItemIndex] = useState<number | null>(null); // null = sub-form closed

  // Derived state
  const isEditingItem = itemIndex !== null;
  const savedEmployees = getInput(form, { path: ["employees"] });

  // Methods
  function saveItem(item: Item, index: number) {
    const isNewItem = index === employees.items.length;

    if (isNewItem) insert(form, { path: ["employees"], initialInput: item });
    else replace(form, { path: ["employees"], at: index, initialInput: item });
    setItemIndex(null);
  }

  function submitForm(values: v.InferOutput<typeof mainSchema>) {
    alert(`Success! ${values.company_name} has ${values.employees.length} employee(s)`);
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Sub-form tests</h4>
      </header>

      <section>
        <InputField form={form} id="company_name">
          <Label>Company name</Label>
          <Input type="text" placeholder="Lendo" />
        </InputField>

        {isEditingItem && (
          <SubForm
            item={savedEmployees[itemIndex]}
            onCancel={() => setItemIndex(null)}
            onSave={(item) => saveItem(item, itemIndex)}
          />
        )}

        {!isEditingItem &&
          employees.items.map((key, index) => (
            <ViewCard
              key={key}
              title={savedEmployees[index].employee_name ?? ""}
              onEdit={() => setItemIndex(index)}
              onDelete={() => remove(form, { path: ["employees"], at: index })}
            />
          ))}

        {!isEditingItem && (
          <Button variant="secondary" onClick={() => setItemIndex(employees.items.length)}>
            Add employee <Icon name="plus" />
          </Button>
        )}
      </section>

      <hr />

      <footer>
        <Button type="submit" disabled={isEditingItem}>
          Submit
        </Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
