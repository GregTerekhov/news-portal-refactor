import React, { FC, useEffect, useState } from 'react';

import { useDB, useFiltersAction } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsList } from 'components';
import { Accordeon, Loader, Notification, PlugImage } from 'ui';
import { useLocation } from 'react-router-dom';
import { useFilterNews } from 'components/NewsFIlterManager/subcomponents/FiltersBlock/hooks';

const ReadPage: FC<{}> = () => {
  const [openToast, setOpenToast] = useState<boolean>(false);

  const { allReads, isLoadingDBData, getReads } = useDB();
  const { hasResults } = useFiltersAction();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  // const { readNews, setReadNews } = useReadSortState();

  const { sortedDates } = useFilterNews({ activeLinks });

  useEffect(() => {
    getReads();
  }, [getReads]);

  useEffect(() => {
    if (!!allReads) {
      setOpenToast(true);
      console.log('openToast', openToast);
    }
  }, [allReads]);

  const publishedDate = rebuildedNews
    ?.map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  // Використовуємо Set для визначення унікальних дат
  const uniqueDatesSet = new Set(publishedDate);

  const readNews = sortedDates ? sortedDates : Array.from(uniqueDatesSet).sort().reverse();

  const shouldShowLoader = isLoadingDBData || hasResults === 'loading';
  const shouldShowPlug = rebuildedNews.length === 0 || hasResults === 'empty';
  const shouldShowAccordeon = !shouldShowLoader && !shouldShowPlug;

  return (
    <>
      {shouldShowLoader && <Loader variant='generalSection' />}
      {!shouldShowLoader && rebuildedNews && (
        <Notification
          variant='non-interactive'
          openToast={openToast}
          setOpenToast={setOpenToast}
          title='Monthly statistics'
          description={`${rebuildedNews.length} news added to Reads`}
        />
      )}
      {shouldShowAccordeon && readNews.length > 0 && (
        <div>
          {readNews.map((date) => (
            <Accordeon key={date} dateSeparator={date} position='readPage'>
              <NewsList
                currentItems={rebuildedNews?.filter(
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
