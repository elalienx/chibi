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
import SubForm, { type Item } from "./SubForm";

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your full name."),
    v.minLength(3, "Name is too short."),
    v.maxLength(50, "Name is too long."),
  ),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });
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
    setItems(items.filter((_, index) => index !== deleteIndex));
  }

  function submitForm(values: v.InferOutput<typeof schema>) {
    alert(`Success! ${values.name} has ${items.length} friend(s)`);
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Sub-form tests</h4>
      </header>

      <section>
        <InputField form={form} id="name">
          <Label>Your name</Label>
          <Input type="text" placeholder="Leif Lend" />
        </InputField>
      </section>

      <section>
        <h5>Friends</h5>

        {isEditingItem && (
          <SubForm
            item={items[itemIndex]}
            onCancel={() => setItemIndex(null)}
            onSave={(item) => saveItem(item, itemIndex)}
          />
        )}

        {!isEditingItem &&
          items.map((item, index) => (
            <ViewCard key={index} item={item} onEdit={() => setItemIndex(index)} onDelete={() => deleteItem(index)} />
          ))}

        {!isEditingItem && (
          <Button variant="secondary" onClick={() => setItemIndex(items.length)}>
            Add <Icon name="plus" />
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
