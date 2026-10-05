// Node modules
import type { CSSProperties } from "react";
import { useField, type FormStore } from "@formisch/react";

// Project files
import formatWithSpaces from "components/input/helpers/formatWithSpaces";
import "./slider.css";

interface Props {
  /** Unique identifier of a form field. */
  id?: string;

  /** An instance of a Formisch form. */
  form?: FormStore;

  /** The maximum value of the slider. Also displayed as the right label. */
  max: number;

  /** The minimum value of the slider. Also displayed as the left label. */
  min: number;

  /** The amount the value changes on each drag or arrow key press. */
  step?: number;
}

export default function Slider({ id, form, max, min, step = 1 }: Props) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // Local state
  const field = useField(form, { path: [id] });

  // Derived state
  const value = Number(field.input ?? min);
  const progress = ((value - min) / (max - min)) * 100;
  const blueProgressBar = { "--progress": `${progress}%` } as CSSProperties;

  return (
    <div className="slider">
      <input
        {...field.props}
        id={id}
        max={max}
        min={min}
        step={step}
        style={blueProgressBar}
        type="range"
        value={value}
      />
      <span className="min">{formatWithSpaces(min)}</span>
      <span className="max">{formatWithSpaces(max)}</span>
    </div>
  );
}
