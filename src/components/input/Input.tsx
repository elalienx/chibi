// Project files
import InputNumber from "./InputNumber";
import InputText from "./InputText";
import type InputProps from "./types/InputProps";

export default function Input(props: InputProps) {
  // Special case
  if (props.type === "number") return <InputNumber {...props} />;

  return <InputText {...props} />;
}
