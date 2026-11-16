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
import companySchema from "./companySchema";

export default function FormPage() {
  // Local state
  const form = useForm({
    schema: companySchema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { employees: [] },
  });
  const employeesArray = useFieldArray(form, { path: ["employees"] });
  const [itemIndex, setItemIndex] = useState<number | null>(null); // null = sub-form closed

  // Derived state
  const items = getInput(form, { path: ["employees"] });
  const isEditingItem = itemIndex !== null;

  // Methods
  function saveItem(item: object, index: number) {
    const isNewItem = index === employeesArray.items.length;

    if (isNewItem) insert(form, { path: ["employees"], initialInput: item });
    else replace(form, { path: ["employees"], at: index, initialInput: item });
    setItemIndex(null);
  }

  function deleteItem(index: number) {
    remove(form, { path: ["employees"], at: index });
  }

  function submitForm(values: v.InferOutput<typeof companySchema>) {
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
            item={items[itemIndex]}
            onCancel={() => setItemIndex(null)}
            onSave={(item) => saveItem(item, itemIndex)}
          />
        )}

        {!isEditingItem &&
          employeesArray.items.map((id, index) => (
            <ViewCard
              key={id}
              item={items[index]}
              onEdit={() => setItemIndex(index)}
              onDelete={() => deleteItem(index)}
            />
          ))}

        {!isEditingItem && (
          <Button variant="secondary" onClick={() => setItemIndex(items.length)}>
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
