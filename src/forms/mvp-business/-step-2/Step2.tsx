// Node modules
import { Form, useForm, type SubmitHandler } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import Tooltip from "components/tooltip/Tooltip";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import BankIDTooltip from "./BankIDTooltip";
import schema from "./schema";

export default function Step2() {
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

  // Methods
  const submitForm: SubmitHandler<typeof schema> = (values) => {
    updateApplication(values);
    setStep("step-4");
  };

  return (
    <Form of={form} onSubmit={submitForm} className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Personuppgifter</h4>
        <small>Nästa: Val av bolag</small>
      </header>

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
        <Button type="submit">Fortsätt med BankID</Button>
        <small>
          Varför ber vi om identifiering via BankID? <Tooltip>{BankIDTooltip}</Tooltip>
        </small>
      </footer>
    </Form>
  );
}
