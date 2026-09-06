// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import SelectorGroup from "components/selector-group/SelectorGroup";
import SelectorOption from "components/selector-option/SelectorOption";

const schema = v.object({
  likes_beer: v.pipe(v.string(), v.nonEmpty("Say either yes or no.")),
  likes_guiness: v.pipe(
    v.string(),
    v.nonEmpty("Say either yes or no."), // input radio send us a string even if we send a boolean
    v.transform((value) => value === String(true)), // thus, this converts it back to boolean
  ),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });
  const [result, setResult] = useState("");

  // Methods
  function submitForm(values: v.InferOutput<typeof schema>) {
    const selectorString = values.likes_beer;
    const selectorBoolean = values.likes_guiness;
    const validateBoolean = typeof selectorBoolean === "boolean" ? (selectorBoolean ? "TRUE" : "FALSE") : "NON BOOLEAN";

    setResult(`Result: Selector 1 "${selectorString}" | Selector 2: ${validateBoolean}`);
    alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Selector group tests</h4>
      </header>

      <section>
        <SelectorGroup form={form} id="likes_beer">
          <Label>Do you like beer?</Label>
          <SelectorOption value="yes">Yes</SelectorOption>
          <SelectorOption value="no">No</SelectorOption>
        </SelectorGroup>

        <SelectorGroup form={form} id="likes_guiness">
          <Label>Do you like Guiness?</Label>
          <SelectorOption value={true}>Yes</SelectorOption>
          <SelectorOption value={false}>No</SelectorOption>
        </SelectorGroup>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
        {result && <small>{result}</small>}
      </footer>
    </Form>
  );
}
