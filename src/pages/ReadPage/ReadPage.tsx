import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDB, useFiltersAction } from 'reduxStore/hooks';

import { useActiveLinks, useChooseRenderingNews, useFilterNews, useReadNewsContent } from 'hooks';

import { NewsList, Toast } from 'components';
import { Accordeon, Loader, PlugImage } from 'ui';

const ReadPage: FC<{}> = () => {
  const { allReads, isLoadingDBData, errorDB, getReads } = useDB();
  const { hasResults } = useFiltersAction();

  const activeLinks = useActiveLinks();

  const initialReadsList = useReadNewsContent({ activeLinks });
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { sortedDates } = useFilterNews({ activeLinks });

  const navigate = useNavigate();

  useEffect(() => {
    if (errorDB && errorDB >= 500) {
      navigate('/serverError');
    }
  }, [errorDB]);

  useEffect(() => {
    getReads();
  }, [getReads]);

  const readNews = sortedDates && sortedDates.length > 0 ? sortedDates : initialReadsList;

  const shouldShowLoader = isLoadingDBData || hasResults === 'loading';
  const shouldShowPlug = rebuildedNews.length === 0 || hasResults === 'empty';
  const shouldShowAccordeon =
    !shouldShowLoader && !shouldShowPlug && readNews && readNews.length > 0;
  const shouldShowToast = !shouldShowLoader && rebuildedNews && allReads.length > 0;
  return (
    <>
      {shouldShowLoader && <Loader variant='generalSection' />}
      {shouldShowToast && <Toast variant='non-interactive' status='info' />}
      {shouldShowAccordeon && (
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
