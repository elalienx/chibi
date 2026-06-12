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
    },
    viewport: {
      options: {
        mobile: {
          name: "Mobile",
          styles: { width: "320px", height: "100%" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "550px", height: "100%" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "768px", height: "100%" },
        },
      },
    },
  },
});
