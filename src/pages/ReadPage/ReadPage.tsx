import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useDB, useFiltersAction } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews, useFilterNews, useReadNewsContent } from 'hooks';

import { NewsList } from 'components';
import { Accordeon, Loader, Notification, PlugImage } from 'ui';

const ReadPage: FC<{}> = () => {
  const [openToast, setOpenToast] = useState<boolean>(false);

  const { allReads, isLoadingDBData, getReads } = useDB();
  const { hasResults } = useFiltersAction();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const initialReadsList = useReadNewsContent({ activeLinks });
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { sortedDates } = useFilterNews({ activeLinks });

  useEffect(() => {
    getReads();
  }, [getReads]);

  useEffect(() => {
    if (!!allReads && allReads.length > 0) {
      setOpenToast(true);
    }
  }, [allReads]);

  const readNews = sortedDates && sortedDates.length > 0 ? sortedDates : initialReadsList;

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
      {shouldShowAccordeon && readNews && readNews.length > 0 && (
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
