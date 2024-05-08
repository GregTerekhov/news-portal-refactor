import type { PartialVotedNewsArray } from 'types';
import { formatDateToString } from 'helpers';

const DEFAULT_TITLE_LENGTH = 56;
const WIDE_SCREENS_TITLE_LENGTH = 87;

// Функція для організації новин за місяцями
export const organiseNewsByMonth = (
  newsArray: PartialVotedNewsArray,
): Record<string, PartialVotedNewsArray> => {
  const organisedNews: Record<string, PartialVotedNewsArray> = {};

  if (newsArray?.length > 0) {
    newsArray.forEach((news) => {
      const additionDate = news?.additionDate;

      if (additionDate) {
        const { fullMonthYear: key } = formatDateToString(additionDate);

        if (!organisedNews[key]) {
          organisedNews[key] = [];
        }

        organisedNews[key].push(news);
      }
    });
  }

  return organisedNews;
};

//Функція калькуляції довжини назви видалених новин в таблиці
export const getNewsTitle = (title: string, isWideScreens: boolean): string => {
  let cutTitleLength: number;

  switch (true) {
    case isWideScreens:
      cutTitleLength = WIDE_SCREENS_TITLE_LENGTH;
      break;
    default:
      cutTitleLength = DEFAULT_TITLE_LENGTH;
      break;
  }
  return title.length > cutTitleLength ? `${title.slice(0, cutTitleLength)}...` : title;
};

export const getButtonStyles = (iconName: string, disabled: boolean | undefined): string => {
  return `${disabled ? 'text-greyAlt dark:text-greyBase' : 'text-accentBase hocus:text-accentAlt dark:text-whiteBase dark:hocus:text-accentBase'} ${iconName === 'reset' ? 'max-md:right-12' : 'max-md:right-0'} group flex items-center gap-x-4 transition-colors duration-500 max-md:absolute max-md:top-0 max-md:h-10 max-md:w-10 max-md:justify-center`;
};

export const getIconStyles = (disabled: boolean | undefined): string => {
  return `${disabled ? 'fill-greyAlt dark:fill-greyBase' : 'fill-accentBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:fill-whiteBase dark:group-hover:fill-accentBase dark:group-focus:fill-accentBase'}`;
};
