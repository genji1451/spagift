import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roulette: {
          primary: "#FF4B91",
          secondary: "#FF7676",
          accent: "#FFE7A0",
          dark: "#4D4C7D",
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "0.9375rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "8px", 
          medium: "12px", 
          large: "16px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: "#fff1f8",
              100: "#ffe4f2",
              200: "#ffc9e5",
              300: "#ff9ecd",
              400: "#ff64ab",
              500: "#ff4b91",
              600: "#ff1f71",
              700: "#e60054",
              800: "#bd0046",
              900: "#9c033d",
              DEFAULT: "#ff4b91",
              foreground: "#ffffff"
            },
            secondary: {
              50: "#fff1f1",
              100: "#ffe1e1",
              200: "#ffc7c7",
              300: "#ff9e9e",
              400: "#ff7676",
              500: "#ff4747",
              600: "#ff1f1f",
              700: "#e60000",
              800: "#bd0000",
              900: "#9c0303",
              DEFAULT: "#ff7676",
              foreground: "#ffffff"
            }
          }
        }
      }
    })
  ]
}
