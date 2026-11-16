// Node modules
import { useState } from "react";
import {
  focus,
  Form,
  getDeepErrorEntry,
  insert,
  isValid,
  remove,
  useFieldArray,
  useForm,
  validate,
} from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import ValidationMessage from "components/validation-message/ValidationMessage";
import SubForm from "./SubForm";
import { mainSchema } from "./schema";

const PATH = ["employees"] as const;
const INITIAL_EMPLOYEE = { employee_name: "", job_role: "" };

export default function FormPage() {
  // Local state
  const form = useForm({
    schema: mainSchema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { company_name: "", employees: [] },
  });
  const employees = useFieldArray(form, { path: PATH });
  const [isAddBlocked, setIsAddBlocked] = useState(false);

  // Derived state
  const areEmployeesValid = isValid(form, { path: PATH });
  const showAddError = isAddBlocked && !areEmployeesValid; // Hides itself once the user fixes the employees

  // Methods
  async function addEmployee() {
    await validate(form); // Also stores the company name errors, but Chibi only shows them after submit
    const firstError = getDeepErrorEntry(form, { path: PATH });

    setIsAddBlocked(firstError !== null);
    if (firstError) focus(form, { path: firstError.path });
    else insert(form, { path: PATH, initialInput: INITIAL_EMPLOYEE });
  }

  function deleteEmployee(index: number) {
    remove(form, { path: PATH, at: index });
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

        {showAddError && (
          <ValidationMessage ariaErrorId="aria-error-employees">
            Please make sure the employees are correct before adding another
          </ValidationMessage>
        )}
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
