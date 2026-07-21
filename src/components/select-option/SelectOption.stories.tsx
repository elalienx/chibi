// Node modules
import { Form, useField, useForm, type FieldStore } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../.storybook/preview";
import SelectOption from "./SelectOption";

// Metadata
const meta = preview.meta({
  title: "Form atoms/Select Option",
  component: SelectOption,
});

// Properties
const favorite_videogame = v.pipe(v.string(), v.nonEmpty());
const schema = v.object({ favorite_videogame });

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => {
    const form = useForm({
      schema: schema,
      validate: "blur",
      revalidate: "blur",
      initialInput: { favorite_videogame: "megaman_x_4" },
    });
    const field = useField(form, { path: ["favorite_videogame"] });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <SelectOption field={field as FieldStore} id="favorite_videogame" value="final_fantasy_viii">
          Final Fantasy VIII
        </SelectOption>
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
      initialInput: { favorite_videogame: "megaman_x_4" },
    });
    const field = useField(form, { path: ["favorite_videogame"] });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <SelectOption field={field as FieldStore} id="favorite_beer" value="megaman_x_4">
          Megaman X4
        </SelectOption>
      </Form>
    );
  },
});
