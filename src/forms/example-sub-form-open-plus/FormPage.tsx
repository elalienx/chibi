// Node modules
import { Form, useForm } from "@formisch/react";
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

  // Methods
  function submitForm(values: v.InferOutput<typeof mainSchema>) {
    alert(`Success! ${values.company_name} was submitted`);
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Sub-form open plus tests</h4>
      </header>

      <section>
        <InputField form={form} id="company_name">
          <Label>Company name</Label>
          <Input type="text" placeholder="Lendo" />
        </InputField>

        {/* Static preview of the UI, the list logic comes in the next step. */}
        <SubForm title="Employee 1" />

        <Button variant="secondary">
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
