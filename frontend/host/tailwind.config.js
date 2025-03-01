const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white-100%": "#FFFFFF",
        "white-90%": "#FFFFFFE5",
        "white-80%": "#FFFFFFCC",
        "black-900": "#0B2740",
        "black-800": "#8A9AB5",
        "black-700": "#395064",
        "black-600": "#475C6F",
        "black-400": "#AEB7BF",
        "black-100": "#F7F7F7",
        "black-15%": "#D9D9D926",
        "black-2%": "#00000005",
        "blue-900": "#435678",
        "blue-800": "#506790",
        "blue-300": "#D3DFF4",
        "blue-200": "#D3DFF4",
        "blue-100": "#EEF4FF",
        "blue-60%": "#50679099",
        "red-900": "#9C3E3F",
        "red-100": "#9C3E3F1A",
        "red-50%": "#9C3E3F80",
        "orange-900": "#D1C92C",
        "orange-100": "#D1C92C",
        "orange-50%": "#D1C92C80",
        "green-900": "#5C9050",
        "green-100": "#5C9050",
        "green-50%": "#5C905080",
        "violet-900": "#905070",
        "violet-100": "#905070",
        "violet-50%": "#90507080",
        "purple-100": "#895090",
        "purple-50%": "#89509080",
      },
      boxShadow: {
        regular: "0px 0px 16px 0px rgba(22, 39, 71, 0.08)",
      },
      fontFamily: {
        "inter-400": ["Inter-400"],
        "inter-500": ["Inter-500"],
        "inter-600": ["Inter-600"],
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
    plugin(function ({ addBase, theme, addUtilities }) {
      addBase({
        ":root": {
          //colors
          "--main-bg": theme("colors.white-100%"),
          "--main-stroke": theme("colors.black-100"),
          "--inputs-bg": theme("colors.black-100"),
          "--inputs-blue": theme("colors.blue-800"),
          "--inputs-red": theme("colors.red-900"),
          "--main-menu": theme("colors.white-90%"),
          "--main-line-header": theme("colors.black-2%"),
          "--main-blur": theme("colors.black-15%"),
          "--secondary-icon-black": theme("colors.black-900"),
          "--secondary-icon-gray": theme("colors.blue-200"),
          "--secondary-icon-red": theme("colors.red-900"),
          "--secondary-icon-orange": theme("colors.orange-900"),
          "--secondary-icon-green": theme("colors.green-900"),
          "--secondary-icon-blue": theme("colors.blue-800"),
          "--secondary-icon-light-blue": theme("colors.blue-300"),
          "--secondary-icon-white": theme("colors.white-100%"),
          "--secondary-icon-purple": theme("colors.violet-900"),
          "--secondary-bg-black": theme("colors.black-100"),
          "--secondary-bg-red": theme("colors.red-100"),
          "--secondary-bg-orange": theme("colors.orange-100"),
          "--secondary-bg-green": theme("colors.green-100"),
          "--secondary-bg-blue": theme("colors.blue-100"),
          "--secondary-bg-peorple": theme("colors.violet-100"),
          "--secondary-bg-white": theme("colors.white-100%"),
          "--button-primary-enabled": theme("colors.blue-800"),
          "--button-primary-click": theme("colors.blue-900"),
          "--button-primary-disabled": theme("colors.blue-100"),
          "--button-secondary-enabled": theme("colors.blue-100"),
          "--button-secondary-click": theme("colors.blue-200"),
          "--button-secondary-disabled": theme("colors.blue-100"),
          "--text-primary": theme("colors.black-900"),
          "--text-secondary": theme("colors.black-700"),
          "--text-tertiary": theme("colors.black-600"),
          "--text-additional": theme("colors.black-400"),
          "--text-white": theme("colors.white-100%"),
          "--text-blue": theme("colors.blue-800"),
          "--text-light-blue": theme("colors.blue-300"),
          "--text-red": theme("colors.red-900"),
          "--text-orange": theme("colors.orange-900"),
          "--text-green": theme("colors.green-900"),
          //toasters
          "--toaster__icon--success": theme("colors.white-100%"),
          "--toaster__icon--error": theme("colors.white-100%"),
          "--toaster__icon--info": theme("colors.white-100%"),
          "--toaster__bg": theme("colors.black-900"),
          "--toaster__message": theme("colors.white-100%"),
        },
      });
      addUtilities(
        {
          /* Titles */
          ".typography__title--max": {
            fontFamily: theme("fontFamily.inter-600"),
            fontSize: "24px",
            lineHeight: "29.05px",
            color: "var(--text-primary)",
          },
          ".typography__title--large": {
            fontFamily: theme("fontFamily.inter-500"),
            fontSize: "18px",
            lineHeight: "21.78px",
            color: "var(--text-primary)",
          },
          ".typography__title--medium": {
            fontFamily: theme("fontFamily.inter-500"),
            fontSize: "16px",
            lineHeight: "19.36px",
            color: "var(--text-primary)",
          },
          ".typography__title--medium--white": {
            fontFamily: theme("fontFamily.inter-500"),
            fontSize: "16px",
            lineHeight: "19.36px",
            color: "var(--text-white)",
          },
          ".typography__title--small": {
            fontFamily: theme("fontFamily.inter-500"),
            fontSize: "14px",
            lineHeight: "16.94px",
            color: "var(--text-primary)",
          },
          ".typography__title--micro": {
            fontFamily: theme("fontFamily.inter-500"),
            fontSize: "12px",
            lineHeight: "14.52px",
            color: "var(--text-primary)",
          },

          /* Text */
          ".typography__text--accent": {
            fontFamily: theme("fontFamily.inter-500"),
            fontSize: "14px",
            lineHeight: "16.94px",
            color: "var(--text-blue)",
          },
          ".typography__text--primary": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "14px",
            lineHeight: "16.94px",
            color: "var(--text-primary)",
          },
          ".typography__text--secondary": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "14px",
            lineHeight: "16.94px",
            color: "var(--text-secondary)",
          },
          ".typography__text--tertiary": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "14px",
            lineHeight: "16.94px",
            color: "var(--text-tertiary)",
          },
          ".typography__text--white": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "14px",
            lineHeight: "16.94px",
            color: "var(--text-white)",
          },
          ".typography__text--additional": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "14px",
            lineHeight: "16.8px",
            color: "var(--text-additional)",
          },

          /* Meta */
          ".typography__meta": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "12px",
            lineHeight: "14.52px",
            color: "var(--text-tertiary)",
          },
          ".typography__meta--error": {
            fontFamily: theme("fontFamily.inter-500"),
            fontSize: "12px",
            lineHeight: "14.52px",
            color: "var(--text-red)",
          },
          ".typography__meta--mini": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "10px",
            lineHeight: "12.10px",
            color: "var(--text-tertiary)",
          },
          ".typography__meta--additional": {
            fontFamily: theme("fontFamily.inter-400"),
            fontSize: "10px",
            lineHeight: "12px",
            color: "var(--text-additional)",
          },
        },
        ["responsive", "hover"]
      );
    }),
  ],
};
