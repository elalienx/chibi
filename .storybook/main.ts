// Node modules
import { defineMain } from "@storybook/react-vite/node";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineMain({
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(tsconfigPaths());

    return config;
  },
});
