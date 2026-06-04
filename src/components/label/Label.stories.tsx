// Project files
import preview from "../../../.storybook/preview";
import Label from "components/label/Label";

// Metadata
const meta = preview.meta({
  title: "Components/Label",
  component: Label,
});

// Stories
export const Story1 = meta.story({
  name: "Label",
  render: () => <Label id="email">Write your email</Label>,
});

export const Story2 = meta.story({
  name: "Label with tooltip",
  render: () => (
    <Label id="email" hint="we ask for your email so you can login again in the future.">
      Write your email
    </Label>
  ),
});

export const Story3 = meta.story({
  name: "Label with error",
  render: () => <Label>Write your email</Label>,
});
