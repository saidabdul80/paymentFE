// tailwind.config.js
import { constants } from './src/helpers/constants';
export default {
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    ...Object.keys(constants).map(color => `tw-bg-[${constants[color]}]/${constants.transparent_level}`),
    ...Object.keys(constants).map(color => `tw-bg-[${constants[color]}]`),
    ...Object.keys(constants).map(color => `tw-text-[${constants[color]}]`),
    ...Object.keys(constants).map(color => `tw-border-[${constants[color]}]`),

  ],
  important: true,
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
