// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../../state/useFormNavigation";
import schema from "./schema";

export default function Step7() {
  // Global state
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema,
    validate: "blur",
    revalidate: "blur",
  });

  // Methods
  function submitForm() {
    setStep("success-step");
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-7" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>7. Om hushållet</h4>
      </header>

      <section></section>

      <hr />

      <footer>
        <Button type="submit">
          Nästa <Icon name="arrow-right" />
        </Button>
      </footer>
    </Form>
  );
}
