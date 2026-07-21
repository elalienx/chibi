// Project files
import preview from "../../../.storybook/preview";
import Label from "components/label/Label";

// Metadata
const meta = preview.meta({
  title: "Form atoms/Label",
  component: Label,
});

// Stories
export const Default = meta.story({
  name: "Label",
  render: () => <Label id="email">Write your email</Label>,
});

export const WithTooltip = meta.story({
  name: "Label with tooltip",
  render: () => (
    <Label id="email" hint="We ask for your email so you can login again in the future.">
      Write your email
    </Label>
  ),
});

export const WithError = meta.story({
  name: "Label (id error)",
  render: () => <Label>Write your email</Label>,
});
