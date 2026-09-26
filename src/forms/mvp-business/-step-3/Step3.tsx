// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";
import "./step-3.css";

export default function Step3() {
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
    setStep("step-4");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form" id="step-3">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Val av bolag</h4>
        <small>Nästa: Omsättning</small>
      </header>

      <hr />

      <section>
        <RadioGroup form={form} id="company_org_number">
          <RadioOption value="5590245535">Connys & Sjukvård AB</RadioOption>
          <RadioOption value="5590480512">Birgers Guldsmedja AB</RadioOption>
          <RadioOption value="5561081620">Christinas Sjukvård AB</RadioOption>
        </RadioGroup>
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
