// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";
import "./step-1.css";

export default function Step1() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-2");
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-1" className="business-form">
      <section>
        <InputField form={form} id="loan_amount">
          <Label>Välj lånesumma:</Label>
          <Input type="number" suffix="kr" />
        </InputField>

        <InputField form={form} id="loan_period">
          <Label>Välj lånetid:</Label>
          <Input type="number" suffix="år" />
        </InputField>
      </section>

      <footer>
        <Button type="submit">
          Påbörja ansökan <Icon name="arrow-right" />
        </Button>
        <small>(Ansökan är inte bindande)</small>
      </footer>
    </Form>
  );
}
