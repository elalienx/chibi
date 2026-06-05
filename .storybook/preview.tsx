// Node modules
import { definePreview } from "@storybook/react-vite";

// Project files
import "../src/styles/style.css";
import "./center-components.css";

export default definePreview({
  addons: [],
  parameters: {
    docs: {
      codePanel: true,
      layout: "centered",
    },
  },
});
