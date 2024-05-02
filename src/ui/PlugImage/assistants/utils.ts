export const plugImageTextStyles =
  'text-center text-2xl font-bold tracking-smallTight text-darkBase transition-colors dark:text-whiteBase md:w-548px md:text-5xl md:tracking-tighter';

export const generateText = (isHomeActive: boolean, isErrorAPI: boolean | undefined): string => {
  return isErrorAPI && isHomeActive
    ? 'It seems you have been send too much requests then its needed'
    : 'We haven’t found news from this category';
};
