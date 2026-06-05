import { create } from "storybook/theming/create";

// Colors
const background = "#96CCCA";
const dominant = "#38787E";
const accent = "#CF3C83";
const text = "#383B3E";
const white = "#FFFFFF";
const border = "#C0C8D0";

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
  colorPrimary: dominant,
  colorSecondary: background,

  // UI
  appBg: white,
  appContentBg: white,
  appPreviewBg: white,
  appBorderColor: border,
  appBorderRadius: 8,

  // Text colors
  textColor: text,
  textInverseColor: white,

  // Toolbar default and active colors
  barTextColor: text,
  barSelectedColor: accent,
  barHoverColor: background,
  barBg: white,

  // Form colors
  inputBg: white,
  inputBorder: border,
  inputTextColor: text,
  inputBorderRadius: 4,
});
