// Project files
import icons from "./font-awesome.json";
import "./icon.css";

// Types
type IconName = Exclude<keyof typeof icons, "_default">;

interface Props {
  /** The icon name, taken from the keys of font-awesome.json. */
  name: IconName;
}

export default function Icon({ name }: Props) {
  // Derived state
  const icon = icons[name] || icons._default;

  return (
    <svg className="icon" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
      <path d={icon} />
    </svg>
  );
}
