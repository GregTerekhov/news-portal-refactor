/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
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
    extend: {
      colors: {
        whiteBase: '#f4f4f4',
        darkBase: '#111321',
        accentBase: '#4440f6',
        accentAlt: '#4b48db',
        greyBase: '#5f6775',
        greyAlt: '#a8a8a8',
        greyIcon: '#a2a2a2',
        accentForeground: 'rgba(68, 64, 246, 0.70)', // accentBase 70%
        foregroundLight: 'rgba(244, 244, 244, 0.80)', // whiteBase 40%
        foreground: 'rgba(244, 244, 244, 0.40)', // whiteBase 40%
        foregroundAlt: 'rgba(254, 254, 255, 0.30)', //fefefe 30%
        contrastWhite: '#ffffff',
        dropdownBase: '#f8f8f8',
        readBase: '#00dd73',
        line: 'rgba(0, 0, 0, 0.20)', // #000000 20%
        lineAlt: '#929292',
        calendarText: '#000000',
        calendarTextLight: 'rgba(60, 60, 67, 0.3)', //'#3c3c343'
        weatherLocation: '#FEFEFF4D',
      },
      fontSize: {
        small: '12px',
        base: '14px',
        medium: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
        giant: '42px',
      },
      letterSpacing: {
        tightest: -0.408,
        tighter: -0.4,
        bigTight: -0.32,
        mediumTight: -0.24,
        smallTight: -0.2,
        tight: -0.078,
        normal: 0,
        wide: 0.12,
        bigWide: 0.24,
        wider: 0.28,
        widest: 0.38,
      },
      lineHeight: {
        tighter: '1.333',
        tight: '1.375',
        normal: '1.5',
        moreRelaxed: '1.71',
        mediumRelaxed: '1.75',
        mostRelaxed: '1.79',
      },
      maxHeight: {
        sectionSmall: 'calc(100vh - 81px)',
        sectionMedium: 'calc(100vh - 106px)',
        sectionLarge: 'calc(100vh - 113px)',
      },
      spacing: {
        '50%': '50%',
        '50%-': '-50%',
      },
    },
  },
  plugins: [],
};
