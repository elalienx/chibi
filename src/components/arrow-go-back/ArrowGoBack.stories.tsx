// Project files
import preview from "../../../.storybook/preview";
import ArrowGoBack from "./ArrowGoBack";

// Metadata
const meta = preview.meta({
  title: "Components/Arrow Go Back",
  component: ArrowGoBack,
});

// Methods
function onClick() {
  alert("Miku acknoledges your click but she says there is nowhere else to go!");
}

// Stories
export const Default = meta.story({
  name: "Arrow Go Back",
  render: () => <ArrowGoBack onClick={onClick} />,
});
