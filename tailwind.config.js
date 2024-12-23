import { colors, safeList, spacing } from './src/setting/tailwind.ts'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './docs/**/*.{vue,js,ts,jsx,tsx,mdx}'],
  safelist: [...safeList],
  theme: {
    extend: {
      colors: {
        ...colors
      },
      spacing: {
        ...spacing
      },
      lineHeight: {
        8.5: '2.125rem' /* 34px */
      }
    }
  },
  plugins: []
}
