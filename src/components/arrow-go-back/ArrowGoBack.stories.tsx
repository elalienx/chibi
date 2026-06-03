// Project files
import preview from "../../../.storybook/preview";
import ArrowGoBack from "./ArrowGoBack";

// Metadata
const meta = preview.meta({
  title: "Components/ArrowGoBack",
  component: ArrowGoBack,
});

// Methods
function onClick() {
  alert("Miku acknoledges your click but she says there is nowhere else to go!");
}

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <ArrowGoBack onClick={onClick} />,
});

