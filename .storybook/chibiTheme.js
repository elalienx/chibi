import { create } from "storybook/theming/create";

export default create({
  base: "light",
  // Typography
  fontBase: '"Helvetica Neue", "Open Sans", sans-serif',
  fontCode: '"Menlo", "monospace"',
  brandTitle: "Aphrodite Chibi",
  brandUrl: "https://lendo.se",
  brandImage: "https://aphrodite-chibi.web.app/images/miku.png",
  brandTarget: "_self",

  // Theme colors
  colorPrimary: "#38787E",
  colorSecondary: "#96CCCA",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#C0C8D0",
  appBorderRadius: 8,

  // Text colors
  textColor: "#383B3E",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  barTextColor: "#383B3E",
  barSelectedColor: "#CF3C83",
  barHoverColor: "#96CCCA",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#10162F",
  inputTextColor: "#383B3E",
  inputBorderRadius: 4,
});
