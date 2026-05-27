// Project file
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./pc-engine-modal.css";

interface Props {
  /** A callback to request the modal to be closed. */
  onClose: () => void;
}

// This is a purer component.
// It does not need to import the global store to close itself.
export default function PCEngineModal({ onClose }: Props) {
  return (
    <div className="modal pc-engine-modal">
      <span>🎮</span>
      <h2>I'm a the PC-Engine modal!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure hic laudantium eum harum beatae magni
        necessitatibus deleniti sint nesciunt! Voluptatem accusantium officia dolor necessitatibus incidunt aliquam
        facilis, nisi cupiditate fuga!
      </p>
      <Button type="button" onClick={onClose}>
        Close
        <Icon name="x-mark" />
      </Button>
    </div>
  );
}
