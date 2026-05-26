// Node modules
import { Form, getInput, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Checkbox from "components/checkbox/Checkbox";
import { useState } from "react";

const schema = v.object({
  acceptTerms: v.pipe(v.optional(v.boolean(), false)), // We use optional() because we want to allow the form to pass even if you dont interact
  politicalExposedPerson: v.pipe(v.optional(v.boolean(), true)),
});

export default function FormPage() {
  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { politicalExposedPerson: true },
  });
  const [formResult, setFormResult] = useState("On standby 🕒");

  // Properties
  const termsURL = "https://en.wikipedia.org/wiki/Terms_of_service";
  const politicalExposedPerson = getInput(form, { path: ["politicalExposedPerson"] });

  // Methods
  function submitForm() {
    // Safeguard
    if (!politicalExposedPerson) {
      alert("You cannot proceed if PEP 🚫");
      setFormResult("The form failed the validation ❌");
      return;
    }

    alert("Success! 🎉");
    setFormResult("The form passed the validation ✅");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Checkbox tests</h4>
      </header>

      <section>
        <Checkbox form={form} id="acceptTerms">
          Do you accept our terms and conditions?{" "}
          <a href={termsURL} target="_blank">
            View terms
          </a>
        </Checkbox>

        <Checkbox form={form} id="politicalExposedPerson">
          I certify that I am NOT a politically exposed person (PEP).
        </Checkbox>

        <span>{formResult}</span>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
