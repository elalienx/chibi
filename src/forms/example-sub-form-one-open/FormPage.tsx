// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";
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
  const form = useForm({ schema: mainSchema, validate: "blur", revalidate: "blur" });
  const [items, setItems] = useState<Item[]>([]); // Saved outside the parent form, on each sub-form save
  const [itemIndex, setItemIndex] = useState<number | null>(null); // null = sub-form closed

  // Derived state
  const isEditingItem = itemIndex !== null;

  // Methods
  function saveItem(item: Item, index: number) {
    const updatedItems = [...items];

    updatedItems[index] = item;
    setItems(updatedItems);
    setItemIndex(null);
  }

  function deleteItem(deleteIndex: number) {
    const updatedItems = items.filter((_item, index) => index !== deleteIndex);

    setItems(updatedItems);
  }

  function submitForm(values: v.InferOutput<typeof mainSchema>) {
    alert(`Success! ${values.company_name} has ${items.length} employee(s)`);
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Sub-form tests</h4>
      </header>

      <section>
        <InputField form={form} path={["company_name"]}>
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
          items.map((item, index) => (
            <ViewCard
              key={index}
              title={item.employee_name}
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
