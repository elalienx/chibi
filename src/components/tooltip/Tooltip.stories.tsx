// Project files
import preview from "../../../.storybook/preview";
import Tooltip from "./Tooltip";

// Metadata
const meta = preview.meta({
  title: "Components/Tooltip",
  component: Tooltip,
});

// Properties
const Link = (
  <a target="_blank" href="https://github.com/elalienx/aphrodite-chibi">
    Official documentation
  </a>
);

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => <Tooltip>To learn more about Aphrodite Chibi read the {Link}</Tooltip>,
});
