import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercelStatic from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    },
  }),
  site: "https://focus-photo.vercel.app/",
});
