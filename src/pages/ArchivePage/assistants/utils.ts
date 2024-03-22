import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import type { PartialVotedNewsArray } from 'types';

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
