// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";

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
    const radioString = values.likes_beer;
    const radioBoolean = values.likes_guiness;
    const validateBoolean = typeof radioBoolean === "boolean" ? (radioBoolean ? "TRUE" : "FALSE") : "NON BOOLEAN";

    setResult(`Result: Radio 1 "${radioString}" | Radio 2: ${validateBoolean}`);
    alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Radio group tests</h4>
      </header>

      <section>
        <RadioGroup form={form} id="likes_beer">
          <Label>Do you like beer?</Label>
          <RadioOption value="yes">Yes</RadioOption>
          <RadioOption value="no">No</RadioOption>
        </RadioGroup>

        <RadioGroup form={form} id="likes_guiness">
          <Label>Do you like Guiness?</Label>
          <RadioOption value={true}>Yes</RadioOption>
          <RadioOption value={false}>No</RadioOption>
        </RadioGroup>
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
