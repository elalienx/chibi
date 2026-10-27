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
import "./step-6-ab.css";

export default function Step6AB() {
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

  // Components
  const CheckIcon = <Icon name="circle-check" />;
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
        <h4>Borgensman</h4>
      </header>

      <hr />

      <section>
        <header className="section-header">
          <h4>Lägg till personlig borgensman</h4>
          <p>Att gå i personlig borgen betyder att du betalar för lånet om företaget inte kan.</p>
        </header>

        <ul className="check-list">
          <li>{CheckIcon} 50% större chans att lånet beviljas.</li>
          <li>{CheckIcon} Chans till bättre villkor och lägre ränta.</li>
          <li>{CheckIcon} Ingen påverkan på din kreditvärdighet.</li>
        </ul>

        <RadioGroup form={form} id="is_guarantor">
          <RadioOption value={true}>Jag vill gå i personlig borgen.</RadioOption>
          <RadioOption value={false}>Jag vill uppge en borgensman senare.</RadioOption>
        </RadioGroup>
      </section>

      <hr />

      <footer>
        <p className="terms">
          Genom att slutföra din ansökan godkänner du {UserAgreement} och vår {PrivacyPolicy}.
        </p>
        <Button type="submit">
          Skicka in ansökan <Icon name="bankid" />
        </Button>
      </footer>
    </Form>
  );
}
