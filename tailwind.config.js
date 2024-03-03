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
  important: true,
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
        disabledBase: '#a2a2a2',
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
        '225px': '225px',
        sectionSmall: 'calc(100vh - 82px)',
        sectionMedium: 'calc(100vh - 107px)',
        sectionLarge: 'calc(100vh - 114px)',
        customScrollHeight: 'calc(100% - 20px)',
      },
      width: {
        '70px': '70px',
        '74px': '74px',
        '83px': '83px',
        '96px': '96px',
        '165px': '165px',
        '168px': '168px',
        '173px': '173px',
        '180px': '180px',
        '250px': '250px',
        '288px': '288px',
        '346px': '346px',
        '353px': '353px',
        '390px': '390px',
        '395px': '395px',
        '442px': '442px',
        '548px': '548px',
        '600px': '600px',
        '900px': '900px',
      },
      height: {
        '25px': '25px',
        '35px': '35px',
        '57px': '57px',
        '60px': '60px',
        '66px': '66px',
        '81px': '81px',
        '100px': '100px',
        '106px': '106px',
        '113px': '113px',
        '132px': '132px',
        '165px': '165px',
        '180px': '180px',
        '225px': '225px',
        '395px': '395px',
        '515px': '515px',
        '630px': '630px',
        '655px': '655px',
        '675px': '675px',
        '700px': '700px',
      },
      minHeight: {
        '81px': '81px',
        '106px': '106px',
        '113px': '113px',
        '136px': '136px',
        sectionSmall: 'calc(100vh - 82px)',
        sectionMedium: 'calc(100vh - 107px)',
        sectionLarge: 'calc(100vh - 114px)',
      },
      spacing: {
        none: 'none',
      },
      transitionDuration: {
        DEFAULT: '500ms',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: 0 },
          to: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
          to: { height: '0', opacity: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.5s ease-in',
        'accordion-up': 'accordion-up 0.5s ease-in',
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
