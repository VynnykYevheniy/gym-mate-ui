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
        primary: "var(--primary-color)", // Динамический цвет // Добавляем цвет primary, color button, голотипы
        primaryHover: "var(--primary-hover-color)", // Для hover // onHover color buttons
        secondTextColor: "#6b7280", // default color text on white background
        pageBackgroundColor: "#FAFAFA", // background color in App.css main block every page
        defaultInfoSectionColor: "#FFFFFF" //white default info block
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
