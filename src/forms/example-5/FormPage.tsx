// Node modules
import { Form, getInput, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Checkbox from "components/checkbox/Checkbox";

/**
 *  Input checkbox send us a string even if we send a boolean,
 *  thus, we do v.string() and v.transform() to convert it back to boolean.
 *  v.optional() handles the initial unchecked state where the value is undefined.
 */
const schema = v.object({
  acceptTerms: v.pipe(v.optional(v.boolean(), false)),
  politicalExposedPerson: v.optional(v.boolean(), true),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Properties
  const termsURL = "https://en.wikipedia.org/wiki/Terms_of_service";

  // Methods
  function submitForm() {
    const politicalExposedPerson = getInput(form, { path: ["politicalExposedPerson"] });

    if (form.isValid) {
      // Safeguard
      if (!politicalExposedPerson) {
        alert("You cannot proceed if PEP 🚫");
        return;
      }

      alert("Success! 🎉");
    }
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
          I am not a Politicial Exposed Person (PEP)
        </Checkbox>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
