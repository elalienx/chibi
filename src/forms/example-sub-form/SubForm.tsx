// Node modules
import { handleSubmit, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import cleanInitialInput from "helpers/cleanInitialInput";
import "./sub-form.css";

// The ids start with "friend_" so they don't clash with the ids of the parent form
const schema = v.object({
  friend_name: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your friend's full name."),
    v.minLength(3, "Name is too short."),
    v.maxLength(50, "Name is too long."),
  ),
  friend_song: v.pipe(v.string(), v.nonEmpty("Pick a song.")),
});

export type Item = v.InferOutput<typeof schema>;

interface Props {
  /** The saved item to edit. Leave empty to add a new item. */
  item?: Item;

  /** Closes the sub-form without saving. */
  onCancel: () => void;

  /** Receives the validated item when the user clicks "Save". */
  onSave: (item: Item) => void;
}

export default function SubForm({ item, onCancel, onSave }: Props) {
  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: item ? cleanInitialInput({ input: item }) : undefined,
  });

  return (
    <div className="sub-form">
      <InputField form={form} id="friend_name">
        <Label>Friend name</Label>
        <Input type="text" placeholder="Leif Lend" />
      </InputField>

      <ChipGroup form={form} id="friend_song">
        <Label>Favorite Miku song</Label>
        <ChipOption value="World is Mine">World is Mine</ChipOption>
        <ChipOption value="Senbonzakura">Senbonzakura</ChipOption>
        <ChipOption value="Melt">Melt</ChipOption>
        <ChipOption value="Rolling Girl">Rolling Girl</ChipOption>
      </ChipGroup>

      <footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        {/* Not a submit button: this sub-form lives inside the parent form, and HTML forms cannot be nested. */}
        <Button variant="primary" onClick={handleSubmit(form, onSave)}>
          Save
        </Button>
      </footer>
    </div>
  );
}
