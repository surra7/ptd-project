import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        noto: ['var(--font-noto)'],
      },
      colors: {
        veryPurple: '#873DFF',
        mediumPurple: '#BE96FF',
        lightPurple: '#DECAFF',
        lightGray: '#C9C9C9',
        veryRed: '#D40000',
      },
    },
  },
  plugins: [],
};
export default config;
