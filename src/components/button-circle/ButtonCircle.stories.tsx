// Project files
import preview from "../../../.storybook/preview";
import ButtonCircle from "./ButtonCircle";

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
export const Default = meta.story({
  name: "Default",
  render: () => <ButtonCircle name="Increase" icon="plus" onClick={onClick} />,
});

export const Minus = meta.story({
  name: "Minus",
  render: () => <ButtonCircle name="Decrease" icon="minus" onClick={onClick} />,
});

export default meta;
