// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";

const schema = v.object({
  likes_beer: v.pipe(v.string("Say either yes or no.")),
  likes_guiness: v.pipe(v.string("Say either yes or no.")),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm() {
    if (form.isValid) alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="soft-background">
      <section className="top">
        <h4>Radio group tests</h4>

        <RadioGroup form={form} id="likes_beer">
          <Label>Do you like beer?</Label>
          <RadioOption value="true">Yes</RadioOption>
          <RadioOption value="false">No</RadioOption>
        </RadioGroup>

        <RadioGroup form={form} id="likes_guiness">
          <Label> Do you like Guiness?</Label>
          <RadioOption value="true">Yes</RadioOption>
          <RadioOption value="false">No</RadioOption>
        </RadioGroup>
      </section>

      <hr />

      <section className="bottom" style={{ textAlign: "center" }}>
        <Button type="submit">Submit</Button>
        <br />
        <small>(Text to clean Playwright selector)</small>
      </section>
    </Form>
  );
}
