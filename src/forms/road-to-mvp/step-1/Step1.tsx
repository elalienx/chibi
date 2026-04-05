// Node modules
import { Form, useForm } from "@formisch/react";
import type { InferOutput } from "valibot";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import useFormStore from "../helpers/useFormStore";
import type { Step } from "../helpers/Step";
import schema from "./schema";

interface Props {
  setStep: (step: Step) => void;
}

export default function Step2({ setStep }: Props) {
  // Global state
  const { updateFormStore } = useFormStore();

  // Properties
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm(values: InferOutput<typeof schema>) {
    if (form.isValid) {
      updateFormStore(values);
      setStep("step-2");
    }
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-1" className="soft-background">
      <section className="top">
        <header>
          <button className="go-back" onClick={() => setStep("intro-step")} type="button">
            <Icon name="arrow-left" /> Tillbaka
          </button>
          <h4>1. Om lånet</h4>
        </header>

        <RadioGroup form={form} id="property_type">
          <Label>För vilken typ av bostad söker du lån</Label>
          <RadioOption value="house">Villa</RadioOption>
          <RadioOption value="apartment">Lägenhet</RadioOption>
          <RadioOption value="terraced_house">Radhus</RadioOption>
          <RadioOption value="holiday_home">Fritidshus</RadioOption>
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
