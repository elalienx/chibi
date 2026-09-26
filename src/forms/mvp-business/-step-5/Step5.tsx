// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Icon from "components/icon/Icon";
import purposes from "../data/purposes";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";

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

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("success-step");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Lånesyfte</h4>
        <small>Nästa: Borgensman</small>
      </header>

      <hr />

      <section>
        <ChipGroup form={form} id="purpose">
          {purposes.map((item) => (
            <ChipOption key={item.value} value={item.value}>
              {item.label}
            </ChipOption>
          ))}
        </ChipGroup>
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
