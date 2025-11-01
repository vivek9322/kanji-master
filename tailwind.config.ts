import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'japanese-red': '#B91C1C',
        'japanese-red-light': '#DC2626',
        'soft-gray': '#F3F4F6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

