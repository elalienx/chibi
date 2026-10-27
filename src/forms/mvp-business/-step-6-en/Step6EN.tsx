// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import Hints from "./Hints";
import schema from "./schema";
import "./step-6-en.css";

export default function Step6EN() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application, treatZeroAsEmpty: true }),
  });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("success-step");
  }

  // Components
  const UserAgreement = (
    <a href="https://se.cdn.lendocdn.com/pdf/terms_conditions_business_loans.pdf" target="_blank">
      användaravtalet
    </a>
  );
  const PrivacyPolicy = (
    <a href="https://www.lendo.se/privacy-policy/personuppgiftspolicy" target="_blank">
      personuppgiftspolicy
    </a>
  );

  return (
    <Form of={form} onSubmit={submitForm} className="business-form" id="step-6">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Befintliga lån</h4>
      </header>

      <hr />

      <section>
        <div className="columns">
          <InputField form={form} hints={Hints} id="blanco_loans">
            <Label>Blancolån</Label>
            <Input type="number" suffix="kr" />
          </InputField>

          <InputField form={form} hints={Hints} id="installment_loans">
            <Label>Avbetalningskrediter</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        </div>

        <InputField form={form} id="house_loans">
          <Label>Bolån</Label>
          <Input type="number" suffix="kr" />
        </InputField>
      </section>

      <hr />

      <footer>
        <p className="terms">
          Genom att slutföra din ansökan godkänner du {UserAgreement} och vår {PrivacyPolicy}.
        </p>
        <Button type="submit">
          Slutför <Icon name="circle-check" />
        </Button>
      </footer>
    </Form>
  );
}
