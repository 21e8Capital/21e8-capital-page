import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/svg/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
        },
      },
      textColor: {
        primary: {
          DEFAULT: "#252525",
          light: "#4F4F4F",
          lighter: "#686868",
        },
      },
      borderColor: {
        primary: {
          DEFAULT: "#FFC400",
          light: "#FFD472",
          lighter: "#FFECB7",
        },
      },
      backgroundColor: {
        primary: {
          DEFAULT: "#FFC400",
          light: "#FFD472",
          lighter: "#FFECB7",
        },
      },
    },
  },
  plugins: [],
};
export default config;
