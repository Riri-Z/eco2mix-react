/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: '#58e1c1',
        myBlue: '#216c91',
        darkblue: '#181745'
      },
    },
  },
  plugins: [],
};
