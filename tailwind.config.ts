import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Citizen-red-gradient-color': 'linear-gradient(to right, #00BDBD, red)',
        'PR-red-gradient-color': 'linear-gradient(to right, blue, red)',
        'Foreigner-red-gradient-color': 'linear-gradient(to right, orange, red)',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        // slab: ['Roboto Slab', 'serif'],
        // sans: ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        Citizen: "#00BDBD",
        PR: "#007BFF",
        Foreigner: "#FFC107",
        turquoise: {
          50: '#E0F7F7',
          100: '#B3EBEB',
          200: '#80DEDE',
          300: '#4DD1D1',
          400: '#26C7C7',
          500: '#00BDBD',
          600: '#00A5A5',
          700: '#008888',
          800: '#006B6B',
          900: '#004F4F',
        },
      },
    },
  },
  plugins: [],
};
export default config;
