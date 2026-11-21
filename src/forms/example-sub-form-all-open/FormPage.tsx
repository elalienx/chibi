// Node modules
import type { SubmitEvent } from "react";
import { getInput, handleSubmit, insert, remove, reset, useFieldArray, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import SubForm from "./SubForm";
import { schemaCompany, schemaEmployees } from "./schema";

const INITIAL_EMPLOYEE = { employee_name: "", job_role: "" };
const CLEAR_SUBMIT_STATE = { keepInput: true, keepTouched: true, keepEdited: true };

export default function FormPage() {
  // Local state
  const companyForm = useForm({
    schema: schemaCompany,
    validate: "blur",
    revalidate: "blur",
    initialInput: { company_name: "" },
  });
  const employeesForm = useForm({
    schema: schemaEmployees,
    validate: "blur",
    revalidate: "blur",
    initialInput: { employees: [] },
  });
  const employees = useFieldArray(employeesForm, { path: ["employees"] });

  // Methods
  async function addEmployee() {
    await handleSubmit(employeesForm, () => {})();

    // Safeguard
    if (!employeesForm.isValid) return;

    insert(employeesForm, { path: ["employees"], initialInput: INITIAL_EMPLOYEE });
    reset(employeesForm, CLEAR_SUBMIT_STATE);
  }

  async function validateForms(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    await handleSubmit(companyForm, () => {})();
    await handleSubmit(employeesForm, () => {})();

    // Safeguard
    if (!companyForm.isValid || !employeesForm.isValid) return;

    submitForms();
  }

  function submitForms() {
    const company = getInput(companyForm);
    const staff = getInput(employeesForm);

    alert(`Success! ${company.company_name} has ${staff.employees?.length} employee(s)`);
  }

  return (
    <form noValidate onSubmit={validateForms} className="default-form">
      <header>
        <h4>Sub-form open tests</h4>
      </header>

      <section>
        <InputField form={companyForm} id={["company_name"]}>
          <Label>Company name</Label>
          <Input type="text" placeholder="Lendo" />
        </InputField>

        {employees.items.map((key, index) => (
          <SubForm
            key={key}
            form={employeesForm}
            index={index}
            title={`Employee ${index + 1}`}
            onDelete={() => remove(employeesForm, { path: ["employees"], at: index })}
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
    </form>
  );
}
