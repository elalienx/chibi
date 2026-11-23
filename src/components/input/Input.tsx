// Project files
import InputNumber from "./InputNumber";
import InputTelephone from "./InputTelephone";
import InputText from "./InputText";
import type InputProps from "./types/InputProps";

export default function Input(props: InputProps) {
  // Special case
  if (props.type === "number") return <InputNumber {...props} />;
  if (props.type === "tel") return <InputTelephone {...props} />;

  return <InputText {...props} />;
}
