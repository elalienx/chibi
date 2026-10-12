// Project files
import preview from "../../../.storybook/preview";
import ButtonCircle from "./ButtonCircle";
import Icon from "components/icon/Icon";

// Metadata
const meta = preview.meta({
  title: "Components/Button circle",
  component: ButtonCircle,
});

// Methods
function onClick() {
  alert("Miku Miku oe oe!");
}

// Stories
export const Plus = meta.story({
  name: "Plus",
  render: () => (
    <ButtonCircle label="Increase" onClick={onClick}>
      <Icon name="plus" />
    </ButtonCircle>
  ),
});

export const Minus = meta.story({
  name: "Minus",
  render: () => (
    <ButtonCircle label="Decrease" onClick={onClick}>
      <Icon name="minus" />
    </ButtonCircle>
  ),
});
