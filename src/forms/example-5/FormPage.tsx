// Node modules
import { Form, getInput, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Checkbox from "components/checkbox/Checkbox";

/**
 *  Input checkbox send us a string even if we send a boolean,
 *  thus, we do v.string() and v.transform() to convert it back to boolean.
 */
const schema = v.object({
  acceptTerms: v.pipe(
    v.string("Say either yes or no."),
    v.transform((value) => value === "true"),
  ),
  politicalExposedPerson: v.pipe(
    v.string("Say either yes or no."),
    v.transform((value) => value === "true"),
  ),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Properties
  const termsURL = "https://en.wikipedia.org/wiki/Terms_of_service";

  // Methods
  function submitForm() {
    if (form.isValid) {
      const checkbox1 = getInput(form, { path: ["acceptTerms"] });
      const checkbox2 = getInput(form, { path: ["acceptTerms"] });

      console.log("Success");
      console.log("checkbox 1", checkbox1);
      console.log("checkbox 2", checkbox2);
    }
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Checkbox tests</h4>
      </header>

      <section>
        <Checkbox form={form} id="acceptTerms" value={true}>
          Do you accept our terms and conditions?{" "}
          <a href={termsURL} target="_blank">
            View terms
          </a>
        </Checkbox>

        {/* This must trigger a modal or warnign when off */}
        <Checkbox form={form} id="politicalExposedPerson">
          Are you a Political Exposed Person? (PEP)
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
