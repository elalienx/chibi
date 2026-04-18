// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import schema from "./schema";
import { apartment, holidayHome, terracedHouse, house } from "../data/propertyTypes";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Step2({ setStep }: Props) {
  // Global state
  const { updateApplication } = useApplication();

  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm(values: object) {
    if (form.isValid) {
      updateApplication(values);
      setStep("step-2");
    }
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-1" className="soft-background">
      <section className="top">
        <header>
          <ArrowGoBack onClick={() => setStep("intro-step")} />
          <h4>1. Om lånet</h4>
        </header>

        <RadioGroup form={form} id="property_type">
          <Label>För vilken typ av bostad söker du lån</Label>
          <RadioOption value={house}>Villa</RadioOption>
          <RadioOption value={apartment}>Lägenhet</RadioOption>
          <RadioOption value={terracedHouse}>Radhus</RadioOption>
          <RadioOption value={holidayHome}>Fritidshus</RadioOption>
        </RadioGroup>
      </section>

      <hr />

      <section className="bottom">
        <Button type="submit">
          Nästa <Icon name="arrow-right" />
        </Button>
      </section>
    </Form>
  );
}
