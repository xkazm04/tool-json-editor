module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          200: "#A6ADBA",
          300: '#B1B6C3',
          400: "#2A303C",
          600: '#ffff6408',
          sidebar: "#2e2f35",
          card: '#2e2f35',
          main: '#28292f'
        },
        light: {
          400: '#CED0D9'
        },
        green: '#2AD8BF',
        violet: '#421ab0',
        input_bg: '#FFFFFF0F',
        gold: '#FFB800',
      }
    },
    borderWidth: {
      1: "1px"
    }
  },
  plugins: [require("daisyui")],
};
