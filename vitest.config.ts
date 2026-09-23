// Node modules
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    pool: "threads",
    fileParallelism: false /** Sacrifices multi-core for inmediate test start time. */,
    isolate: false /** Increases speed for pure tests at the cost of bugs on inpure tests. */,
  },
});
