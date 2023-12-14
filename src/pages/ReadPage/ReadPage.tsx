import React, { FC, useEffect, useState } from 'react';

import { useFilterCollector, useNewsDBCollector } from 'hooks';

import { NewsList } from 'components';
import { Accordeon, Loader, Notification, PlugImage } from 'ui';

const ReadPage: FC<{}> = () => {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const { allReads, isLoadingDBData, getReads } = useNewsDBCollector();
  const { hasResults } = useFilterCollector();

  useEffect(() => {
    getReads();
  }, [getReads]);

  useEffect(() => {
    if (!!allReads) {
      setOpenToast(true);
      console.log('openToast', openToast);
    }
  }, [allReads]);

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
      {!shouldShowLoader && allReads && (
        <Notification
          variant='non-interactive'
          openToast={openToast}
          setOpenToast={setOpenToast}
          title='Monthly statistics'
          description={`${allReads.length} news added to Reads`}
        />
      )}
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
