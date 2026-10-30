// Node modules
import { Form, getInput, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import StepIndicator from "components/step-indicator/StepIndicator";
import purposes from "../data/purposes";
import cleanInitialInput from "helpers/cleanInitialInput";
import exampleSSNs from "../-bank-id-login/exampleSSNs";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";
import "./step-5.css";

export default function Step5() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Derived state
  const purpose = getInput(form, { path: ["purpose"] });
  const selectedPurpose = purposes.find((item) => item.value === purpose);
  const isSoleTrader = application.ssn === exampleSSNs.SOLE_TRADER;
  const skippedCompanySelector = [exampleSSNs.SINGLE_PUBLIC_COMPANY, exampleSSNs.SOLE_TRADER].includes(application.ssn);
  const currentStep = skippedCompanySelector ? 4 : 5;
  const totalSteps = skippedCompanySelector ? 5 : 6;

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep(isSoleTrader ? "step-6-en" : "step-6-ab");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form" id="step-5">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Lånesyfte</h4>
        <small>Nästa: {isSoleTrader ? "Befintliga lån" : "Borgensman"}</small>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </header>

      <hr />

      <section>
        <header className="section-header">
          <h4>Vad ska lånet användas till?</h4>
          <p>Välj det som passar din verksamhet bäst.</p>
        </header>

        <ChipGroup form={form} id="purpose">
          {purposes.map((item) => (
            <ChipOption key={item.value} value={item.value}>
              {item.label}
            </ChipOption>
          ))}
        </ChipGroup>

        {selectedPurpose && (
          <div className="sub-form-details">
            <h5 className="title">Du valde: {selectedPurpose.label}</h5>
            <InputField form={form} id="loan_purpose_details">
              <Label>Berätta mer om ditt lånesyfte</Label>
              <Input type="text" placeholder="t.ex. tre nya truckar till lagret..." />
            </InputField>
          </div>
        )}
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Fortsätt <Icon name="arrow-right" />
        </Button>
      </footer>
    </Form>
  );
}
