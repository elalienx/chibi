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
          styles: { width: "360px", height: "780px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "550px", height: "732px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "768px", height: "100%" },
        },
      },
    },
  },
});
