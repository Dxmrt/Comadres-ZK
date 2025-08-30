/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        comadres: {
          primary: "#C76782",
          "primary-content": "#FFFFFF",
          secondary: "#E6EDF0",
          "secondary-content": "#1F2937",
          accent: "#C76782",
          "accent-content": "#FFFFFF",
          neutral: "#344054",
          "neutral-content": "#FFFFFF",
          "base-100": "#F5F7FA",
          "base-200": "#EEF2F6",
          "base-300": "#E3E8EF",
          "base-content": "#1F2937",
          info: "#3E6CE6",
          success: "#10B981",
          warning: "#FDB022",
          error: "#F04437",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        "comadres-primary": "#64C2A7",
        "comadres-dark": "#1F2937",
        "comadres-gray": "#6B7280",
        "comadres-accent": "#C76782",
        "comadres-light": "#F5F7FA",
        "comadres-light-alt": "#E3E8EF",
      },
      boxShadow: { center: "0 6px 24px rgba(0,0,0,.08)" },
      borderRadius: { xl: "1rem" },
    },
  },
};