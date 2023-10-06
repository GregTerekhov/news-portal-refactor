/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      backgroundBase: '#f4f4f4',
      accentBase: '#4440f6',
      textBase: '#111321',
      accentAlt: '#4b48db',
      greyText: '#5f6775',
      greyTextAlt: '#a8a8a8',
      greyIcon: '#a2a2a2',
      accentForeground: 'rgba(68, 64, 246, 0.70)', // accentBase 70%
      foreground: 'rgba(244, 244, 244, 0.40)', // backgroundBase 40%
      foregroundAlt: 'rgba(254, 254, 255, 0.30)', //fefefe 30%
      contrastText: '#ffffff',
      dropdownBase: '#f8f8f8',
      readBase: '#00dd73',
      line: 'rgba(0, 0, 0, 0.20)', // #000000 20%
      lineAlt: '#929292',
      calendarText: '#000000',
      calendarTextLight: 'rgba(60, 60, 67, 0.3)', //'#3c3c343'
    },
    fontFamily: {
      body: 'Manrope, sans-serif',
      weather: 'Roboto, sans-serif',
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      15: '0.15',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      35: '0.35',
      40: '0.4',
      45: '0.45',
      50: '0.5',
      55: '0.55',
      60: '0.6',
      65: '0.65',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      85: '0.85',
      90: '0.9',
      95: '0.95',
      100: '1',
    },
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1280px',
    },
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
    },
    extend: {},
  },
  plugins: [],
};
