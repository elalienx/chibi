// Project files
import Icon, { type IconName } from "components/icon/Icon";
import "./button-icon.css";

interface Props {
  /** Icon to display inside the button. */
  icon: IconName;

  /** Accessible name of the button, announced by screen readers. */
  name: string;

  /** The function to execute when clicked. */
  onClick?: () => void;

  /** The color of the icon. Use "danger" for destructive actions like deleting. */
  variant?: "default" | "danger";
}

export default function ButtonIcon({ icon, name, onClick, variant = "default" }: Props) {
  return (
    <button aria-label={name} className={`button-icon ${variant}`} onClick={onClick} type="button">
      <Icon name={icon} />
    </button>
  );
}
