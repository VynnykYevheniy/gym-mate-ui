/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#f97316",
        },
        pink: {
          500: "#ec4899",
        },
        cyan: {
          500: "#06b6d4",
        },
        teal: {
          500: "#14b8a6",
        },
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "50%": "50%",
        "16": "4rem",
      },
    },
  },
  plugins: [flowbite],
};
