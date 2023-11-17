import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: "#203D4A",
        whiteIce: "#FAFAFA",
        grayFont: "#7B7B7B",
        inputGray: "#d9d9d9"
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        pulp: ["Pulp", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
