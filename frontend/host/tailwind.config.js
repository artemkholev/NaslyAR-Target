const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: {
          900: "#4A3728",
          800: "#5C4033",
          700: "#333333",
          600: "#475C6F",
          400: "#AEB7BF",
          100: "#F5F5E5",
          15: "#D9D9D926",
          2: "#00000005",
        },
        blue: {
          900: "#435678",
          800: "#6A8D73",
          300: "#E8F0E8",
          200: "#E8F0E8",
          100: "#F5F5E5",
          60: "#6A8D7399",
        },
        red: {
          900: "#D32F2F",
          100: "#FFCDD2",
          50: "#FFEBEE",
        },
        orange: {
          900: "#D1C92C",
          100: "#D1C92C",
          50: "#D1C92C80",
        },
        green: {
          900: "#639149",
          100: "#7da662",
          50: "#8aab55",
          20: "#f0f0e4",
          10: "#fefef4",
        },
        violet: {
          900: "#905070",
          100: "#905070",
          50: "#90507080",
        },
        purple: {
          100: "#895090",
          50: "#89509080",
        },
      },
      boxShadow: {
        regular: "0 4px 10px rgba(0, 0, 0, 0.04)",
        medium: "0 6px 14px rgba(0, 0, 0, 0.06)",
      },
      fontFamily: {
        inter: ["Inter"],
      },
      backgroundImage: {
        "gradient-bg": "linear-gradient(90deg, #639149, #7da662, #8aab55)",
      },
      animation: {
        "light-slide": "light-slide 2s ease-in-out infinite alternate",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "bg-gradient": "bg-gradient 8s ease infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        "light-slide": {
          "0%": { top: "0%" },
          "100%": { top: "75%" },
        },
        "glow-pulse": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateY(20%)", opacity: "0.9" },
        },
        "bg-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        bounce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addBase, theme, addUtilities }) {
      addBase({
        ":root": {
          "--main-bg": theme("colors.green.10"),
          "--header-bg": theme("colors.green.20"),
          "--component-bg": theme("colors.green.20"),
          "--white-bg": theme("colors.white"),
          "--main-stroke": theme("colors.black.100"),
          "--inputs-bg": theme("colors.black.100"),
          "--inputs-blue": theme("colors.blue.800"),
          "--inputs-red": theme("colors.red.900"),
          "--main-menu": theme("colors.white"),
          "--main-line-header": theme("colors.black.2"),
          "--main-blur": theme("colors.black.15"),
          "--secondary-icon-black": theme("colors.black.900"),
          "--secondary-icon-gray": theme("colors.blue.200"),
          "--secondary-icon-red": theme("colors.red.900"),
          "--secondary-icon-green": theme("colors.green.900"),
          "--secondary-icon-blue": theme("colors.blue.800"),
          "--secondary-icon-light-blue": theme("colors.blue.200"),
          "--secondary-icon-white": theme("colors.white"),
          "--secondary-bg-black": theme("colors.black.100"),
          "--secondary-bg-red": theme("colors.red.100"),
          "--secondary-bg-green": theme("colors.green.100"),
          "--secondary-bg-blue": theme("colors.blue.100"),
          "--button-primary-enabled": theme("colors.green.900"),
          "--button-primary-click": theme("colors.green.900"),
          "--button-primary-disabled": theme("colors.green.100"),
          "--button-secondary-enabled": theme("colors.green.100"),
          "--button-secondary-click": theme("colors.green.200"),
          "--button-secondary-disabled": theme("colors.green.50"),
          "--text-primary": theme("colors.black.900"),
          "--text-secondary": theme("colors.black.800"),
          "--text-tertiary": theme("colors.black.700"),
          "--text-white": theme("colors.white"),
          "--text-blue": theme("colors.blue.800"),
          "--text-light-blue": theme("colors.blue.200"),
          "--text-red": theme("colors.red.900"),
          "--text-green": theme("colors.green.900"),
        },
      });
      addUtilities(
        {
          ".typography__title": {
            fontFamily: theme("fontFamily.inter"),
            fontSize: "24px",
            color: "var(--text-primary)",
          },
          ".typography__text": {
            fontFamily: theme("fontFamily.inter"),
            fontSize: "18px",
            color: "var(--text-primary)",
          },
          ".typography__meta": {
            fontFamily: theme("fontFamily.inter"),
            fontSize: "14px",
            color: "var(--text-tertiary)",
          },
          ".typography__text--accent": {
            color: "var(--text-blue)",
          },
          ".typography__text--secondary": {
            color: "var(--text-secondary)",
          },
          ".typography__meta--error": {
            color: "var(--text-red)",
          },
        },
        ["responsive", "hover"]
      );
    }),
  ],
};
