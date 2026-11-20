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

export default function FormPage() {
  // Local state
  const companyForm = useForm({ schema: schemaCompany, validate: "blur", revalidate: "blur" });
  const employeesForm = useForm({
    schema: schemaEmployees,
    initialInput: { employees: [] },
    validate: "blur",
    revalidate: "blur",
  });
  const employees = useFieldArray(employeesForm, { path: ["employees"] }); // Stable item ids, so deleting a sub-form keeps the inputs of the others

  // Methods
  async function addEmployee() {
    // Submit instead of validate(), because Chibi inputs only show their errors once their form is submitted.
    await handleSubmit(employeesForm, () => {})();

    if (!employeesForm.isValid) return;

    // Clears the submitted state, so the new employee does not show errors before the user fills it.
    reset(employeesForm, { keepInput: true, keepTouched: true, keepEdited: true });
    insert(employeesForm, { path: ["employees"], initialInput: { employee_name: "", job_role: "" } });
  }

  function deleteEmployee(index: number) {
    remove(employeesForm, { path: ["employees"], at: index });
  }

  async function submitForms(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // One after the other, so the focus lands on the first error from the top of the page.
    await handleSubmit(employeesForm, () => {})();
    await handleSubmit(companyForm, () => {})();

    if (!employeesForm.isValid || !companyForm.isValid) return;

    // The MVP forms would store both in useApplication() here.
    const company = getInput(companyForm);
    const staff = getInput(employeesForm);

    alert(`Success! ${company.company_name} has ${staff.employees?.length} employee(s)`);
  }

  return (
    <form noValidate onSubmit={submitForms} className="default-form">
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
    </form>
  );
}
