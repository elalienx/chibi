// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import InputField from "../../components/input-field/InputField";
import Label from "../../components/label/Label";

const schema = v.object({
  name: v.pipe(
    v.string("Please enter your full name."),
    v.nonEmpty("Name must not be empty."),
    v.minLength(3, "Name is too short."),
  ),
  age: v.pipe(
    v.string("Please enter your age."),
    v.nonEmpty("Age must not be empty."),
    v.transform((value) => Number(value)),
    v.number("Age be a valid number."),
    v.minValue(18, "You must be at least 18 year old to register."),
    v.maxValue(100, "You are not longer allowed to register."),
  ),
});

export default function FormPage() {
  // Properties
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm() {
    if (form.isValid) alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="soft-background">
      <section className="top">
        <h4>Input field tests</h4>

        <InputField form={form} id="name">
          <Label>Full name</Label>
          <Input type="text" placeholder="Leif Lend" />
        </InputField>

        <InputField form={form} id="age">
          <Label>Age</Label>
          <Input type="number" placeholder="18" />
        </InputField>
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
