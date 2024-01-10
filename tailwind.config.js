/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
      '-moz-backface-visibility': 'visible',
      '-webkit-backface-visibility': 'visible',
      '-ms-backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
      '-ms-backface-visibility': 'hidden',
    },
  });
});

export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      body: 'Manrope, sans-serif',
      weather: 'Roboto, sans-serif',
      header: 'Poppins, sans-serif',
    },
    extend: {
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1280px',
        hg: '1536px',
      },
      zIndex: {
        45: '45',
      },
      boxShadow: {
        modal: '0 5px 15px rgba(168,168,168,.50)',
        card: '8px 10px 20px rgba(17,19,33,.5)', //darkBase 50%
        darkCard: '8px 10px 20px rgba(17,19,33,.5), -5px 3px 20px rgba(17,19,33,.5)',
      },
      colors: {
        whiteBase: '#f4f4f4',
        darkBase: '#111321',
        accentBase: '#4440f6',
        dropdownBase: '#f8f8f8',
        readBase: '#00dd73',
        greyBase: '#5f6775',
        darkBackground: '#2e2e2e',
        darkDropdown: '#424242',
        accentAlt: '#4b48db',
        greyAlt: '#a8a8a8',
        lineAlt: '#929292',
        fullDark: '#000000',
        contrastWhite: '#ffffff',
        disabledBase: '#a2a2a2', // не використовується - залишити під колір disabled
        weatherForeground: 'rgba(254, 254, 255, 0.30)', //fefeff 30%
        calendarTextLight: 'rgba(60, 60, 67, 0.3)', //'#3c3c343'
      },
      fontSize: {
        xs: '10px',
        small: '12px',
        base: '14px',
        medium: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '24px',
        '3.5xl': '28px',
        '4xl': '32px',
        '4.5xl': '36px',
        '5xl': '40px',
        giant: '42px',
        monstrous: '55px',
      },
      letterSpacing: {
        //tracking
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
        //leading
        tighter: '1.333',
        tight: '1.375',
        normal: '1.5',
        moreRelaxed: '1.71',
        mediumRelaxed: '1.75',
        mostRelaxed: '1.79',
      },
      maxHeight: {
        sectionSmall: 'calc(100vh - 82px)',
        sectionMedium: 'calc(100vh - 107px)',
        sectionLarge: 'calc(100vh - 114px)',
      },
      spacing: {
        '676px': '676px',
        '323px': '323px',
        '335px': '355px',
        '395px': '395px',
        '50%': '50%',
        '48%-': '-48%',
        '50%-': '-50%',
        none: 'none',
      },
      transitionDuration: {
        DEFAULT: '500ms',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    backfaceVisibility,
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('@kamona/tailwindcss-perspective'),
  ],
};
