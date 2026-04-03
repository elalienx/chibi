// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import schema from "./schema";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";

interface Props {
  onContinue: () => void;
}

export default function Step2({ onContinue }: Props) {
  // Properties
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm() {
    if (form.isValid) onContinue();
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-2" className="soft-background">
      <section className="top">
        <header>
          <a className="link-go-back" href="/">
            <Icon name="arrow-left" /> Tillbaka
          </a>
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
