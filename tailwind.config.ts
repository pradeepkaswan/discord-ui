import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    boxShadow: {
      sm: "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)",
      md: "0 4px 4px rgba(0,0,0,0.16)",
      lg: "0 8px 16px rgba(0,0,0,0.24)",
    },
    extend: {
      fontFamily: {
        sans: ["gg sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          50: "#ECEDEE",
          100: "#DCDDDE",
          200: "#B9BBBE",
          300: "#8E9297",
          400: "#72767D",
          500: "#5C6067",
          550: "#4F545C",
          600: "#464950",
          700: "#313338",
          800: "#2A2C30",
          900: "#1E1F22",
        },
        brand: "#5865F2",
      },
    },
  },
  plugins: [forms],
};
export default config;
