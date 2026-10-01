// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import Tooltip from "components/tooltip/Tooltip";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import BankIDTooltip from "./components/BankIDTooltip";
import schema from "./schema";
import LoanDetailsEdit from "./components/LoanDetailsEdit";
import LoanDetailsView from "./components/LoanDetailsView";

export default function Step2() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const [isEditingLoan, setIsEditingLoan] = useState(false);
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-3");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Personuppgifter</h4>
        <small>Nästa: Val av bolag</small>
      </header>

      {/* Editable box */}
      {isEditingLoan && <LoanDetailsEdit onSave={() => setIsEditingLoan(false)} />}
      {!isEditingLoan && <LoanDetailsView onEdit={() => setIsEditingLoan(true)} />}

      <hr />

      <section>
        <InputField form={form} id="email">
          <Label>E-postadress</Label>
          <Input type="email" placeholder="namn@email.se" />
        </InputField>

        <InputField form={form} id="phone">
          <Label>Mobilnummer</Label>
          <Input type="tel" placeholder="+46 XX XXX XX XX" />
        </InputField>
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Fortsätt med BankID
          <Icon name="arrow-right" />
        </Button>
        <small>
          Varför ber vi om identifiering via BankID? <Tooltip>{BankIDTooltip}</Tooltip>
        </small>
      </footer>
    </Form>
  );
}
