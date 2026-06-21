// Project files
import InputNumber from "./InputNumber";
import InputText from "./InputText";
import type InputProps from "./helpers/InputProps";

export default function Input(props: InputProps) {
  // Special cases
  if (props.type === "number") return <InputNumber {...props} />;

  return <InputText {...props} />;
}
