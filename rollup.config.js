import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "use-axios-http-requests-ts",
  },
  external: ["react", "axios"],
  plugins: [typescript({ tsconfig: "tsconfig.json" })],
});
