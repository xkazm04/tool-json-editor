module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          300: '#B1B6C3'
        },
        light: {
          400: '#CED0D9'
        },
        green: '#2AD8BF',
        violet: '#421ab0',
        input_bg: '#FFFFFF0F',
        gold: '#FFB800'
      }
    },
  },
  plugins: [require("daisyui")],
};
