// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";

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
    const chipString = values.likes_beer;
    const chipBoolean = values.likes_guiness;
    const validateBoolean = typeof chipBoolean === "boolean" ? (chipBoolean ? "TRUE" : "FALSE") : "NON BOOLEAN";

    setResult(`Result: Chip 1 "${chipString}" | Chip 2: ${validateBoolean}`);
    alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Chip group tests</h4>
      </header>

      <section>
        <ChipGroup form={form} id="likes_beer">
          <Label>Do you like beer?</Label>
          <ChipOption value="yes">Yes</ChipOption>
          <ChipOption value="no">No</ChipOption>
        </ChipGroup>

        <ChipGroup form={form} id="likes_guiness">
          <Label>Do you like Guiness?</Label>
          <ChipOption value={true}>Yes</ChipOption>
          <ChipOption value={false}>No</ChipOption>
        </ChipGroup>
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
