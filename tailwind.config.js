/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%)",
      },
    },
  },
  plugins: [],
};
