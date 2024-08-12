import { defineConfig } from "orval";

export default defineConfig({
  main: {
    input: {
      target: "./docs/openapi.yaml",
    },
    output: {
      mode: "split",
      target: "src/api/endpoints/main.ts",
      schemas: "src/api/dto",
      clean: true,
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/client.ts",
          name: "useApiClient",
        },
        components: {
          schemas: {
            suffix: "Dto",
          },
          responses: {
            suffix: "Response",
          },
          parameters: {
            suffix: "Params",
          },
          requestBodies: {
            suffix: "Request",
          },
        },
      },
    },
  },
});
