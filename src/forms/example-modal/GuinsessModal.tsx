// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./guiness-modal.css";
import useModal from "state/useModal";

export default function GuinessModal() {
  // Global state
  const { closeModal } = useModal();

  return (
    <div className="modal guiness-modal">
      <span>🍺</span>
      <h1>I'm a the Guiness modal!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure hic laudantium eum harum beatae magni
        necessitatibus deleniti sint nesciunt! Voluptatem accusantium officia dolor necessitatibus incidunt aliquam
        facilis, nisi cupiditate fuga!
      </p>
      <Button type="button" onClick={closeModal}>
        Close
        <Icon name="x-mark" />
      </Button>
    </div>
  );
}
