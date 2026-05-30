// Node modules
import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: "@storybook/react-vite",

  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(tsconfigPaths());

    return config;
  },
};

export default config;
