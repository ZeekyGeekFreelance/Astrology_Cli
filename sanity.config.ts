"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "vedicsages",
  title: "VedicSages CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "not-configured",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
