import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter-400": ["Inter-400"],
        "inter-500": ["Inter-500"],
        "inter-600": ["Inter-600"],
      },
      colors: {
        "white-100%": "#FFFFFF",
        "white-90%": "#FFFFFFE5",
        "black-900": "#101010",
        "black-800": "#333333",
        "black-700": "#434343",
        "black-600": "#777777",
        "black-400": "#BDBDBD",
        "black-100": "#F7F7F7",
        "black-15%": "#D9D9D9",
        "black-2%": "#00000005",
        "blue-900": "#0A5BFF",
        "blue-800": "#3275FE",
        "blue-300": "#C2D6FF",
        "blue-100": "#EEF4FF",
        "blue-60%": "#3275FE99",
        "red-900": "#FE3232",
        "red-100": "#FFEBEB",
        "red-50%": "#FE323280",
        "orange-900": "#FEC532",
        "orange-100": "#FFF9EA",
        "orange-50%": "#FEC53280",
        "green-900": "#07A300",
        "green-100": "#DAF1D9",
        "green-50%": "#07A30080",
        "violet-900": "#B032FE",
        "violet-100": "#F6E7FF",
        "violet-50%": "#B032FE80",
        "purple-100": "#C076ED",
        "purple-50%": "#C076ED80",
      },
      boxShadow: {
        regular: "0 0 30px -6px rgb(16 24 40 / 0.08)",
      },
      backgroundImage: {
        "gradient-bg": "linear-gradient(90deg, #7BD5F5, #787FF6, #50c1e4, #6ecaff)",
      },
      animation: {
        "bg-gradient": "bg-gradient 8s ease infinite",
      },
      keyframes: {
        "bg-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--white-100%": theme("colors.white-100%"),
          "--white-90%": theme("colors.white-90%"),
          "--black-900": theme("colors.black-900"),
          "--black-800": theme("colors.black-800"),
          "--black-700": theme("colors.black-700"),
          "--black-600": theme("colors.black-600"),
          "--black-400": theme("colors.black-400"),
          "--black-100": theme("colors.black-100"),
          "--black-15%": theme("colors.black-15%"),
          "--black-2%%": theme("colors.black-2%"),
          "--blue-900": theme("colors.blue-900"),
          "--blue-800": theme("colors.blue-800"),
          "--blue-300": theme("colors.blue-300"),
          "--blue-100": theme("colors.blue-100"),
          "--blue-60%": theme("colors.blue-60%"),
          "--red-900": theme("colors.red-900"),
          "--red-100": theme("colors.red-100"),
          "--red-50%": theme("colors.red-50%"),
          "--orange-900": theme("colors.orange-900"),
          "--orange-100": theme("colors.orange-100"),
          "--orange-50%": theme("colors.orange-50%"),
          "--green-900": theme("colors.green-900"),
          "--green-100": theme("colors.green-100"),
          "--green-50%": theme("colors.green-50%"),
          "--violet-900": theme("colors.violet-900"),
          "--violet-100": theme("colors.violet-100"),
          "--violet-50%": theme("colors.violet-50%"),
          "--purple-100": theme("colors.purple-100"),
          "--purple-50%": theme("colors.purple-50%"),
        },
      });
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
export default config;
