// Project files
import preview from "../../../.storybook/preview";
import ButtonIcon from "./ButtonIcon";

// Metadata
const meta = preview.meta({
  title: "Components/Button icon",
  component: ButtonIcon,
});

// Methods
function onClick() {
  alert("Miku Miku oe oe!");
}

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <ButtonIcon name="Ändra" icon="pen-to-square" onClick={onClick} />,
});

export const Danger = meta.story({
  name: "Danger",
  render: () => <ButtonIcon name="Ta bort" icon="trash-xmark" onClick={onClick} variant="danger" />,
});
