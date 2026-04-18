// Project files
import Icon from "components/icon/Icon";
import "./arrow-go-back.css";

interface Props {
  /** The function to execute when clicked. */
  onClick?: () => void;
}

export default function ArrowGoBack({ onClick }: Props) {
  return (
    <button className="arrow-go-back" onClick={onClick} type="button">
      <Icon name="arrow-left" /> Tillbaka
    </button>
  );
}
