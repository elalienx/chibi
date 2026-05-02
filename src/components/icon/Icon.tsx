// Project files
import icons from "./font-awesome.json";
import "./icon.css";

interface Props {
  /** The icon name */
  name: "arrow-left" | "arrow-right" | "circle-info" | "x-mark";
}

export default function Icon({ name }: Props) {
  // Properties
  const icon = icons[name] || icons._default;
  const boundingBox = `0 0 ${icon.width} 640`;

  return (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox={boundingBox}>
      <path d={icon.path} />
    </svg>
  );
}
