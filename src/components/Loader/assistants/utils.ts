export const geometryTextBlockClass = 'px-4 mb-5';
export const lineClasses =
  'bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-3xl transition-colors duration-500';
export const absoluteLineClasses =
  'absolute z-20 bg-greyBase/[.4] dark:bg-darkBackground/[.8] transition-colors duration-500';

const lines = [
  { width: 'w-28', height: 'h-6' },
  { width: 'w-[168px] md:w-32', height: 'h-7' },
  { width: 'w-3/4', height: 'h-6 md:h-9' },
  { width: 'w-full', height: 'h-6 md:h-9' },
  { width: 'w-3/5', height: 'h-6 md:h-9' },
  { width: 'w-full', height: 'h-3.5 md:h-4' },
  { width: 'w-full', height: 'h-3.5 md:h-4' },
  { width: 'w-4/5', height: 'h-3.5 md:h-4' },
  { width: 'w-[74px]', height: 'h-3.5' },
  { width: 'w-[70px]', height: 'h-3.5' },
];

export const groups = [
  {
    lines: lines.slice(0, 2),
    className: 'relative h-[395px] mb-4 dark:bg-whiteBase/[.1] rounded-[10px]',
  },
  { lines: lines.slice(2, 5), className: `${geometryTextBlockClass} space-y-3.5 md:space-y-3` },
  { lines: lines.slice(5, 8), className: `${geometryTextBlockClass} space-y-[7px] md:space-y-2` },
  { lines: lines.slice(8), className: 'px-4 flex justify-between' },
];
