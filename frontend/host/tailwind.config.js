/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "white-100%": "#FFFFFF",
        "white-90%": "#FFFFFFE5",
        "white-80%": "#FFFFFFCC",
        "black-900": "#101010",
        "black-800": "#333333",
        "black-700": "#434343",
        "black-600": "#777777",
        "black-400": "#bdbdbd",
        "black-100": "#F7F7F7",
        "black-15%": "#00000026",
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
        "orange-50%": "#FEC532",
        "green-900": "#07A300",
        "green-100": "#DAF1D9",
        "green-50%": "#07A30080",
        "violet-900": "#B032FE",
        "violet-100": "#F6E7FF",
        "violet-50%": "#B032FE80",
        "purple-100": "#C076ED",
        "purple-50%": "#C076ED80",
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
  plugins: [],
};
