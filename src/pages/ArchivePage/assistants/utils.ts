import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { PartialVotedNewsArray } from 'types';

// Функція для організації новин за місяцями
const organiseNewsByMonth = (newsArray: PartialVotedNewsArray) => {
  const organisedNews: Record<string, PartialVotedNewsArray> = {};

  if (newsArray && newsArray?.length > 0) {
    newsArray.forEach((news) => {
      const additionDate = news?.additionDate;

      if (additionDate) {
        // const parsedDate = parseISO(additionDate);
        const key = format(additionDate, 'LLLL/yyyy', { locale: enUS });

        if (!organisedNews[key]) {
          organisedNews[key] = [];
        }

        organisedNews[key].push(news);
      }
    });
  }

  return organisedNews;
};

export default organiseNewsByMonth;
