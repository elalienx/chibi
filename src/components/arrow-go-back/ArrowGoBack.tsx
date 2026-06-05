// Project files
import Icon from "components/icon/Icon";
import "./arrow-go-back.css";

interface Props {
  /** The function to execute when clicked. */
  onClick?: () => void;

  /** Removes the label "Tillbaka". Used on certain forms which prefers to only use the arrow icon. */
  hideLabel?: boolean;
}

export default function ArrowGoBack({ onClick, hideLabel = false }: Props) {
  return (
    <button className="arrow-go-back" onClick={onClick} type="button">
      <Icon name="arrow-left" />
      {!hideLabel && <span>Tillbaka</span>}
    </button>
  );
}
