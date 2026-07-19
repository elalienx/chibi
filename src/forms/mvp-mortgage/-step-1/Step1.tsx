// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import { apartment, holidayHome, terracedHouse, house } from "../data/propertyTypes";
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import schema from "./schema";

const PROPERTY_HINT = "Här anger du vilken typ av bostad lånet avser.";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Step1({ setStep }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();

  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur", initialInput: application });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-2");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="mortgage-form" id="step-1">
      <header>
        <ArrowGoBack onClick={() => setStep("intro-step")} />
        <h4>1. Om lånet</h4>
      </header>

      <section>
        <RadioGroup form={form} id="property_type">
          <Label hint={PROPERTY_HINT}>För vilken typ av bostad söker du lån</Label>
          <RadioOption value={house}>Villa</RadioOption>
          <RadioOption value={apartment}>Lägenhet</RadioOption>
          <RadioOption value={terracedHouse}>Radhus</RadioOption>
          <RadioOption value={holidayHome}>Fritidshus</RadioOption>
        </RadioGroup>
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Nästa <Icon name="arrow-right" />
        </Button>
      </footer>
    </Form>
  );
}
