// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import useApplication from "forms/mvp-business/state/useApplication";
import cleanInitialInput from "helpers/cleanInitialInput";
import schema from "../../-step-1/schema";
import "./loan-details-edit.css";

interface Props {
  onSave: () => void;
}

export default function LoanDetailsEdit({ onSave }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();

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
    onSave();
  }

  return (
    <Form of={form} onSubmit={submitForm} id="loan-details-edit">
      <div className="columns">
        <InputField form={form} id="loan_amount">
          <Label>Lånesumma:</Label>
          <Input type="number" suffix="kr" />
        </InputField>

        <InputField form={form} id="loan_period">
          <Label>Lånetid:</Label>
          <Input type="number" suffix="år" />
        </InputField>
      </div>

      <footer>
        <Button type="submit">
          Okej <Icon name="circle-info" />
        </Button>
      </footer>
    </Form>
  );
}
