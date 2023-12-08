import React, { FC, useEffect } from 'react';

import { useFilterCollector, useNewsDBCollector } from 'hooks';

import { NewsList } from 'components';
import { Accordeon, Loader, PlugImage } from 'ui';

const ReadPage: FC<{}> = () => {
  const { allReads, isLoadingDBData, getReads } = useNewsDBCollector();
  const { hasResults } = useFilterCollector();

  useEffect(() => {
    getReads();
  }, [getReads]);

  const publishedDate = allReads
    ?.map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  // Використовуємо Set для визначення унікальних дат
  const uniqueDatesSet = new Set(publishedDate);

  // Перетворення і сортування дат
  const sortedDates = Array.from(uniqueDatesSet).sort().reverse();

  const shouldShowLoader = isLoadingDBData || hasResults === 'loading';
  const shouldShowPlug = allReads.length === 0 || hasResults === 'empty';
  const shouldShowAccordeon = !shouldShowLoader && !shouldShowPlug;

  return (
    <>
      {shouldShowLoader && <Loader variant='generalSection' />}
      {shouldShowAccordeon && (
        <div>
          {sortedDates.map((date) => (
            <Accordeon key={date} dateSeparator={date} position='readPage'>
              <NewsList
                currentItems={allReads?.filter(
                  (news) => news?.publishDate !== undefined && news?.publishDate === date,
                )}
              />
            </Accordeon>
          ))}
        </div>
      )}
      {!shouldShowLoader && shouldShowPlug && <PlugImage variant='page' />}
    </>
  );
};

export default ReadPage;
