/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: theme=> ({
        'bg-dashboard': 'linear-gradient(to bottom left, #216e93, #21648a, #1f5881, #172d5b, #191c51)'
      }),
      colors: {
        turquoise: '#58e1c1',
        myBlue: '#216c91',
        darkblue: '#181745'
      },
      fontFamily: {
        quickSand: ['QuickSand'],
        quickSandBold: ['Quicksand-Bold'],
        quickSandLight: ['Quicksand-Light'],
        quickSandSemiBold: ['Quicksand-SemiBold'],
      },
      fontSize:{
        'xs':'0.80rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
};
