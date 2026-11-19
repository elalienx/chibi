// Project files
import preview from "../../../.storybook/preview";
import Select from "./Select";

// Metadata
const meta = preview.meta({
  title: "Form atoms/Select",
  component: Select,
});

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => {
    return <Select id="favorite_videogame">Favorite videogame</Select>;
  },
});
