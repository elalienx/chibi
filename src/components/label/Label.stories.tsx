// Project files
import preview from "../../../.storybook/preview";
import Label from "components/label/Label";

// Metadata
const meta = preview.meta({
  title: "Components/Label",
  component: Label,
});

// Stories
export const Primary = meta.story({
  name: "Primary",
  render: () => <Label id="something">Hola mundo</Label>,
});
