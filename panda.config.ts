import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{ts,tsx,js,jsx,astro}",
    "./pages/**/*.{ts,tsx,js,jsx,astro}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        xs: "428px",
        "3xl": "1800px",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      tokens: {
        colors: {
          neutral800: { value: "#262626" },
          neutral700: { value: "#404040" },
          neutral600: { value: "#525252" },
          neutral300: { value: "#f5f5f5" },
          neutral200: { value: "#e5e5e5" },
          neutral100: { value: "#f5f5f5" },
          navy: { value: "#131824" },
          red900: { value: "#7f1d1d" },
          red950: { value: "#450a0a" },
        },
        fontSizes: {
          xxl: { value: "40px" },
          xl: { value: "32px" },
          lm: { value: "24px" },
          md: { value: "20px" },
          sm: { value: "16px" },
          xs: { value: "12px" },
          xxs: { value: "8px" },
        },
        radii: {
          md: { value: "8px" },
          sm: { value: "4px" },
        },
        zIndex: {
          modal: { value: 10 },
          contents: { value: 2 },
        },
      },
      semanticTokens: {
        colors: {
          link: {
            value: {
              base: "{colors.neutral600}",
              _dark: "{colors.neutral100}",
            },
          },
          card: {
            value: {
              base: "{colors.neutral100}",
              _dark: "{colors.navy}",
            },
          },
          text: {
            value: {
              base: "{colors.neutral800}",
              _dark: "{colors.neutral200}",
            },
          },
          profile: {
            value: {
              base: "{colors.neutral700}",
              _dark: "{colors.neutral200}",
            },
          },
          footer: {
            value: {
              base: "{colors.neutral600}",
              _dark: "{colors.neutral300}",
            },
          },
          underBar: {
            value: {
              base: "{colors.red900}",
              _dark: "{colors.red950}",
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  jsxFramework: "react",
});
