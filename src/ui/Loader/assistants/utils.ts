const commonTransitionClass = 'transition-colors duration-500';
const commonContainerClass = 'container w-full flex justify-between px-4 lg:px-6 hg:px-[65px]';
const commonBgContentClass = 'bg-greyAlt/[.4] dark:bg-whiteBase/[.1]';

// variant === 'page'
export const commonPageItemClass = `${commonTransitionClass} ${commonBgContentClass} w-14 h-4 md:h-6 rounded-3xl`;

export const pageClass = `${commonTransitionClass} w-screen max-h-sectionSmall md:max-h-sectionMedium lg:max-h-sectionLarge h-screen flex flex-col items-center animate-pulse bg-greyAlt/[.4] dark:bg-darkBackground/[.1]`;

export const headerContainerPageClass = `${commonContainerClass} min-h-81px md:min-h-106px lg:min-h-113px -mt-[81px] md:-mt-[106px] lg:-mt-[113px] items-center`;

export const logoPageClass = `${commonTransitionClass} ${commonBgContentClass} w-16 h-8 md:w-20 md:h-11 lg:w-28 lg:h-14 rounded-3xl`;

export const menuWrapperClass = 'flex items-center justify-between gap-6';

export const mainContentPageClass = `${commonContainerClass} pt-4 md:pt-6 lg:pt-10`;

//variant === 'generalSection'
const sectionGeometryTextClass = 'px-4 mb-5';

export const sectionItemWrapperClass = `${commonTransitionClass} w-72 md:w-353px lg:w-395px hg:w-442px h-630px md:h-675px bg-contrastWhite/[.8] dark:bg-darkBase/[.4] overflow-hidden rounded-[10px] animate-pulse`;

export const sectionLineClasses = `${commonTransitionClass} rounded-3xl ${commonBgContentClass}`;
export const sectionAbsoluteLineClasses = `${commonTransitionClass} absolute z-20 bg-greyBase/[.4] dark:bg-darkBackground/[.8]`;

const sectionLines = [
  { width: 'w-28', height: 'h-6' },
  { width: 'w-168px md:w-32', height: 'h-7' },
  { width: 'w-3/4', height: 'h-6 md:h-9' },
  { width: 'w-full', height: 'h-6 md:h-9' },
  { width: 'w-3/5', height: 'h-6 md:h-9' },
  { width: 'w-full', height: 'h-3.5 md:h-4' },
  { width: 'w-full', height: 'h-3.5 md:h-4' },
  { width: 'w-4/5', height: 'h-3.5 md:h-4' },
  { width: 'w-74px', height: 'h-3.5' },
  { width: 'w-70px', height: 'h-3.5' },
];

export const sectionGroups = [
  {
    lines: sectionLines.slice(0, 2),
    className: 'relative h-395px mb-4 bg-greyAlt/[.8] dark:bg-whiteBase/[.1] rounded-[10px]',
  },
  {
    lines: sectionLines.slice(2, 5),
    className: `${sectionGeometryTextClass} space-y-3.5 md:space-y-3`,
  },
  {
    lines: sectionLines.slice(5, 8),
    className: `${sectionGeometryTextClass} space-y-[7px] md:space-y-2`,
  },
  { lines: sectionLines.slice(8), className: 'px-4 flex justify-between' },
];

//pagination
const commonPaginationClasses = `${commonTransitionClass} h-10 ${commonBgContentClass}`;

export const paginationItemClass = `${commonPaginationClasses} w-10 rounded-full`;
export const paginationButtonClass = `${commonPaginationClasses} w-14 md:w-28 rounded-[20px]`;

export const paginationWrapperClass = 'flex items-center justify-center gap-2';

//variant === 'element' (weather)
const commonWeatherClasses = `${commonTransitionClass} ${commonBgContentClass}`;
const weatherRoundedFullClass = 'rounded-full';
const weatherRounded20Class = 'rounded-[20px]';

export const weatherWrapperClass =
  'py-5 md:py-8 h-full flex flex-col justify-between items-center animate-pulse';
export const weatherCurrentTemperatureClass = `${commonWeatherClasses} relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 ${weatherRoundedFullClass} after:content-[""] after:h-full after:absolute after:w-px lg:after:w-1 after:-right-2 lg:after:-right-4 after:top-0 after:bg-greyAlt/[.4] after:dark:bg-whiteBase/[.1]`;
export const weatherInfoWrapperClass =
  'py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] space-y-2';
export const currentWeatherInfoClass = `${commonWeatherClasses} w-28 h-2 md:h-4 lg:h-5 ${weatherRounded20Class}`;
export const weatherFeelsLikeClass = `${commonWeatherClasses} w-10 h-2 md:h-3 lg:h-5 ${weatherRoundedFullClass}`;
export const weatherCurrentLocationClass = `${commonWeatherClasses} w-28 h-10 md:h-16 lg:h-20 py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg`;
export const weatherIconClass = `${commonWeatherClasses} m-auto w-32 h-32 md:w-165px md:h-165px ${weatherRoundedFullClass}`;
export const weatherDetailsBlockClass = 'flex flex-col items-center gap-4 md:gap-y-6 lg:w-4/5';
export const weatherDayTextClass = `${commonWeatherClasses} w-28 h-8 md:h-10 ${weatherRounded20Class}`;
export const weatherCurrentDateTextClass = `${commonWeatherClasses} w-56 lg:w-full h-6 md:h-8 ${weatherRounded20Class}`;
export const gridWeatherClass = 'grid grid-cols-2 gap-4 lg:w-full';
export const gridWeatherItemClass = `${commonWeatherClasses} w-24 lg:w-full h-2 md:h-4 lg:h-5 ${weatherRoundedFullClass}`;
