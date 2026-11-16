// Node modules
import { Form, insert, remove, useFieldArray, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import SubForm from "./SubForm";
import { emptyEmployee, mainSchema } from "./schema";

export default function FormPage() {
  // Local state
  const form = useForm({
    schema: mainSchema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { company_name: "", employees: [] },
  });
  const employees = useFieldArray(form, { path: ["employees"] });

  // Methods
  function addEmployee() {
    insert(form, { path: ["employees"], initialInput: emptyEmployee });
  }

  function deleteEmployee(index: number) {
    remove(form, { path: ["employees"], at: index });
  }

  function submitForm(values: v.InferOutput<typeof mainSchema>) {
    alert(`Success! ${values.company_name} has ${values.employees.length} employee(s)`);
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Sub-form open tests</h4>
      </header>

      <section>
        <InputField form={form} path={["company_name"]}>
          <Label>Company name</Label>
          <Input type="text" placeholder="Lendo" />
        </InputField>

        {employees.items.map((item, index) => (
          <SubForm
            key={item}
            form={form}
            index={index}
            title={`Employee ${index + 1}`}
            onDelete={() => deleteEmployee(index)}
          />
        ))}

        <Button variant="secondary" onClick={addEmployee}>
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
