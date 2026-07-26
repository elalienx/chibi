// Node modules
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const assets = fileURLToPath(new URL("../public", import.meta.url));
const sourceCode = fileURLToPath(new URL("../src", import.meta.url));
const tests = fileURLToPath(new URL(".", import.meta.url));
const regexSubFolder: RegExp = /^(components|styles|helpers|state|layouts)\//;
const port = 3100;

export default defineConfig({
  root: tests,
  publicDir: assets,
  plugins: [react()],
  resolve: { alias: [{ find: regexSubFolder, replacement: `${sourceCode}/$1/` }] },
  server: { port: port },
  preview: { port: port },
});
