/** @type {import('tailwindcss').Config} */
export default {
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
      boxShadow: {
        modal: '0 5px 15px rgba(168,168,168,.50)',
        card: '8px 10px 20px rgba(17,19,33,.5)', //darkBase 50%
        darkCard: '8px 10px 20px rgba(17,19,33,.5), -5px 3px 20px rgba(17,19,33,.5)',
      },
      colors: {
        whiteBase: '#f4f4f4',
        darkBase: '#111321',
        darkThemeBackground: '#2e2e2e',
        accentBase: '#4440f6',
        accentAlt: '#4b48db',
        greyBase: '#5f6775',
        greyAlt: '#a8a8a8',
        greyIcon: '#a2a2a2',
        accentForeground: 'rgba(68, 64, 246, 0.70)', // accentBase 70%
        accentLightForeground: 'rgba(68, 64, 246, 0.40)', // accentBase 70%
        foregroundLight: 'rgba(244, 244, 244, 0.80)', // whiteBase 80%
        foregroundDark: 'rgba(46, 46, 46, 0.80)', // darkThemeBackground 80%
        foregroundMedium: 'rgba(46, 46, 46, 0.40)', // darkThemeBackground 40%
        foreground: 'rgba(244, 244, 244, 0.40)', // whiteBase 40%
        skeletonForeground: 'rgba(244, 244, 244, 0.10)', // whiteBase 10%
        placeholderText: 'rgba(17, 19, 33, 0.4)', // darkBase 40%
        foregroundAlt: 'rgba(254, 254, 255, 0.30)', //fefefe 30%
        contrastWhite: '#ffffff',
        contrastWhiteSkeleton: 'rgba(255, 255, 255, 0.8)', // contrastWhite 80%
        skeletonGreyAlt: 'rgba(168, 168, 168, 0.4)', // greyAlt 40 %
        skeletonGreyBase: 'rgba(95, 103, 117, 0.4)', // greyBase 40%
        dropdownBase: '#f8f8f8',
        readBase: '#00dd73',
        line: 'rgba(0, 0, 0, 0.20)', // #000000 20%
        darkThemeLine: 'rgba(244, 244, 244, 0.20)', // whiteBase 20%
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
        sectionSmall: 'calc(100vh - 81px)',
        sectionMedium: 'calc(100vh - 106px)',
        sectionLarge: 'calc(100vh - 113px)',
      },
      spacing: {
        '335px': '355px',
        '395px': '395px',
        '50%': '50%',
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
        16: 'repeat(16, minmax(0, 1fr))',
      },
      // maxWidth: {
      //   maxWidth: calc('max-w' - '64px'),
      // },
    },
  },
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
};
