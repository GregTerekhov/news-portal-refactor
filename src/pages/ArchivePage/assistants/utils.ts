import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import type { PartialVotedNewsArray } from 'types';

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
        const key = format(additionDate, 'LLLL yyyy', { locale: enUS });

        if (!organisedNews[key]) {
          organisedNews[key] = [];
        }

        organisedNews[key].push(news);
      }
    });
  }

  return organisedNews;
};

//Функція форматування дати додавання та видалення новини в таблиці видалених з архиву новин
export const formatTableDates = (changingDate: number): string => {
  return format(changingDate, 'dd/MM/yyyy');
};

//Функція калькуляції довжини назви видалених новин в таблиці
export const getNewsTitle = (title: string, wideScreens: boolean): string => {
  let cutTitleLength: number;

  switch (true) {
    case wideScreens:
      cutTitleLength = WIDE_SCREENS_TITLE_LENGTH;
      break;
    default:
      cutTitleLength = DEFAULT_TITLE_LENGTH;
      break;
  }
  return title.length > cutTitleLength ? `${title.slice(0, cutTitleLength)}...` : title;
};
