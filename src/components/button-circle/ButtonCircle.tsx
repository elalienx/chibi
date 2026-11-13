// Project files
import Icon, { type IconName } from "components/icon/Icon";
import "./button-circle.css";

interface Props {
  /** Icon to display inside the button. */
  icon: IconName;

  /** Accessible name of the button, announced by screen readers. */
  name: string;

  /** The function to execute when clicked. */
  onClick?: () => void;

  /** Prevents clicks and shows the grey style. Used when a counter reaches its limit. */
  disabled?: boolean;
}

export default function ButtonCircle({ icon, name, onClick, disabled = false }: Props) {
  return (
    <button aria-label={name} className="button-circle" disabled={disabled} onClick={onClick} type="button">
      <Icon name={icon} />
    </button>
  );
}
