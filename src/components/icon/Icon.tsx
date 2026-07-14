// Project files
import icons from "./font-awesome.json";
import "./icon.css";

interface Props {
  /** The icon name */
  name: "arrow-left" | "arrow-right" | "chevron-down" | "circle-info" | "hashtag" | "x-mark";
}

export default function Icon({ name }: Props) {
  // Properties
  const icon = icons[name] || icons._default;

  return (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d={icon} />
    </svg>
  );
}
