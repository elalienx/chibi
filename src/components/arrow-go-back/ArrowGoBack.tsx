// Project files
import Icon from "components/icon/Icon";
import "./arrow-go-back.css";

interface Props {
  /** The function to execute when clicked. */
  onClick?: () => void;

  /** Removes the label "Tillbaka" and adds an aria-label as replacement. Used on certain forms which prefers to only use the arrow icon. */
  hideLabel?: boolean;
}

export default function ArrowGoBack({ onClick, hideLabel = false }: Props) {
  return (
    <button aria-label={hideLabel ? "Tillbaka" : undefined} className="arrow-go-back" onClick={onClick} type="button">
      <Icon name="arrow-left" />
      {!hideLabel && <>Tillbaka</>}
    </button>
  );
}
