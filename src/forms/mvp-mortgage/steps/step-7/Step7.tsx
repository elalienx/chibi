// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../../state/useApplication";
import useFormNavigation from "../../state/useFormNavigation";
import Counter from "./components/Counter";
import schema from "./schema";
import "./step-7.css";

export default function Step7() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema,
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
    <Form of={form} onSubmit={submitForm} id="step-7" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>7. Om hushållet</h4>
      </header>

      {/* Adult information */}
      <section className="adults">
        <h5>Antal vuxna</h5>
        <p>Ange hur många vuxna (18 år eller äldre) som bor i hushållet. Räkna med dig själv.</p>
        <Counter id="household_adults" form={form} label="Hur många vuxna är ni i hushållet?" min={1} max={15} />
      </section>

      {/* Children information */}
      <section className="children">
        <h5>Antal barn</h5>
        <p>
          Ange hur många barn under 18 år du eller din medsökande har, även om de inte bor hos er. Har du inga barn? Då
          kan du hoppa över den här delen.
        </p>
        <Button variant="secondary" onClick={() => alert("To be added in the future")}>
          Lägg till ett barn <Icon name="plus" />
        </Button>
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
