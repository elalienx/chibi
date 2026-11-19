// Node modules
import { getInput, setInput, type FormStore } from "@formisch/react";

// Project files
import ButtonCircle from "components/button-circle/ButtonCircle";
import Input from "components/input/Input";
import Label from "components/label/Label";
import "./counter.css";

interface Props {
  /** Unique identifier of the form field that stores the count. */
  id: string;

  /** The form sent by the parent. */
  form: FormStore;

  /** The question shown next to the buttons. */
  label: string;

  /** The lowest allowed value. The minus button is disabled when reached. */
  min: number;

  /** The highest allowed value. The plus button is disabled when reached. */
  max: number;
}

export default function Counter({ id, form, label, min, max }: Props) {
  // Derived state
  const count = Number(getInput(form, { path: [id] }));

  // Methods
  function onChangeCount(step: number) {
    const newCount = Math.min(Math.max(count + step, min), max);

    setInput(form, { path: [id], input: String(newCount) });
  }

  return (
    <div className="counter">
      <Label id={id}>{label}</Label>
      <div className="controls">
        <ButtonCircle icon="minus" name="Minska" disabled={count <= min} onClick={() => onChangeCount(-1)} />
        <Input id={id} form={form} type="number" min={min} max={max} />
        <ButtonCircle icon="plus" name="Öka" disabled={count >= max} onClick={() => onChangeCount(1)} />
      </div>
    </div>
  );
}
