// Project files
import icons from "./font-awesome.json";
import "./icon.css";

interface Props {
  /** The icon name */
  name: "arrow-left" | "arrow-right" | "chevron-down" | "circle-info" | "hashtag" | "x-mark";
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
