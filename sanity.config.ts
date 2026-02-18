"use client";

import React from "react";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

// RELOAD_TRACKER: V4
if (typeof window !== "undefined") {
  window.React = React;
}

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
