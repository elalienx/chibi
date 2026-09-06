// Node modules
import { Form, useField, useForm, type FieldStore } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import ToggleOption from "./ToggleOption";

// Metadata
const meta = preview.meta({
  title: "Form atoms/Toggle Option",
  component: ToggleOption,
});

// Properties
const favorite_beer = v.pipe(v.string(), v.nonEmpty());
const schema = v.object({ favorite_beer });

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => {
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
      initialInput: { favorite_beer: String(false) },
    });
    const field = useField(form, { path: ["favorite_beer"] });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <ToggleOption field={field as FieldStore} id="favorite_beer" value={true}>
          Guiness Beer
        </ToggleOption>
      </Form>
    );
  },
});

export const Selected = meta.story({
  name: "Selected",
  render: () => {
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
      initialInput: { favorite_beer: String(true) },
    });
    const field = useField(form, { path: ["favorite_beer"] });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <ToggleOption field={field as FieldStore} id="favorite_beer" value={true}>
          Guiness Beer
        </ToggleOption>
      </Form>
    );
  },
});
