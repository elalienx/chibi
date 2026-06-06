// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import InputField from "components/input-field/InputField";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import schema from "./schema";
import Tooltip from "components/tooltip/Tooltip";
import BankIDTooltip from "./BankIDTooltip";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Step2({ setStep }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();

  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur", initialInput: application });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-3");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={() => setStep("step-1")} />
        <h4>Personuppgifter</h4>
      </header>

      <section>
        <InputField form={form} id="email">
          <Label>E-postadress</Label>
          <Input type="email" placeholder="namn@email.se" />
        </InputField>

        <InputField form={form} id="phone">
          <Label>Telefonnummer</Label>
          <Input type="tel" placeholder="Ex: 07XXXXXXX" />
        </InputField>
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Fortsätt <Icon name="arrow-right" />
        </Button>
        <p>
          Varför ber vi om identifiering via BankID? <Tooltip children={<BankIDTooltip />} />
        </p>
      </footer>
    </Form>
  );
}
