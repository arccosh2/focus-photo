import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

// const globalCss = defineGlobalStyles({
//   html: {
//     height: "100vh",
//     fontFamily: ["sans-serif", "Hiragino Kaku Gothic ProN", "Hiragino Sans"],
//     color: "#404040",
//     BackgroundAttachment: "fixed",
//     background:
//       "radial-gradient(circle, rgba(255, 205, 206, 1) 0%,rgba(178, 239, 255, 1) 100%)",
//     _osDark: {
//       background:
//         "linear-gradient(180deg, #19054e 0%, #282f4e 50%, #784242 100%)",
//     },
//   },
//   body: {
//     width: "100%",
//     height: "100%",
//     overflowX: "hidden",
//   },
//   button: {
//     cursor: "pointer",
//     backgroundColor: "transparent",
//     border: "none",
//   },
//   a: {
//     textDecoration: "none",
//   },
// });

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          neutral600: { value: "#525252" },
          neutral300: { value: "#f5f5f5" },
          neutral100: { value: "#f5f5f5" },
          red900: { value: "#7f1d1d" },
          indigo950: { value: "#1e1b4b" },
        },
        fontSizes: {
          xxl: { value: "40px" },
          xl: { value: "32px" },
          lm: { value: "24px" },
          md: { value: "20px" },
          sm: { value: "16px" },
          xs: { value: "12px" },
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
          footer: {
            value: {
              base: "{colors.neutral600}",
              _dark: "{colors.neutral300}",
            },
          },
          underBar: {
            value: {
              base: "{colors.red900}",
              _dark: "{colors.indigo950}",
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
