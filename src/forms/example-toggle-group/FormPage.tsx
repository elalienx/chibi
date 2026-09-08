// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import ToggleGroup from "components/toggle-group/ToggleGroup";
import ToggleOption from "components/toggle-option/ToggleOption";

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
    const toggleString = values.likes_beer;
    const toggleBoolean = values.likes_guiness;
    const validateBoolean = typeof toggleBoolean === "boolean" ? (toggleBoolean ? "TRUE" : "FALSE") : "NON BOOLEAN";

    setResult(`Result: Toggle 1 "${toggleString}" | Toggle 2: ${validateBoolean}`);
    alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Toggle group tests</h4>
      </header>

      <section>
        <ToggleGroup form={form} id="likes_beer">
          <Label>Do you like beer?</Label>
          <ToggleOption value="yes">Yes</ToggleOption>
          <ToggleOption value="no">No</ToggleOption>
        </ToggleGroup>

        <ToggleGroup form={form} id="likes_guiness">
          <Label>Do you like Guiness?</Label>
          <ToggleOption value={true}>Yes</ToggleOption>
          <ToggleOption value={false}>No</ToggleOption>
        </ToggleGroup>
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
