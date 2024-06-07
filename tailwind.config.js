// tailwind.config.js
import { constants } from './src/helpers/constants';
import { constantsDark } from './src/helpers/constants_dark';
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

    ...Object.keys(constantsDark).map(color => `tw-bg-[${constantsDark[color]}]/${constantsDark.transparent_level}`),
    ...Object.keys(constantsDark).map(color => `tw-bg-[${constantsDark[color]}]`),
    ...Object.keys(constantsDark).map(color => `tw-text-[${constantsDark[color]}]`),
    ...Object.keys(constantsDark).map(color => `tw-border-[${constantsDark[color]}]`),
    

  ],
  important: true,
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        visby: ['VisbyRoundCF', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
