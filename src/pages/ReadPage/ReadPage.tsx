import React, { FC, useEffect } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { useReadSortStateContext } from 'contexts';
import { useActiveLinks, useChooseRenderingNews, useReadNewsContent } from 'hooks';

import { NewsList } from 'components';
import { Accordeon } from 'ui';

const ReadPage: FC = () => {
  const { getReads } = useDBRedux();
  const { sortedDates } = useReadSortStateContext();

  const activeLinks = useActiveLinks();
  const initialReadsList = useReadNewsContent();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);

  useEffect(() => {
    getReads();
  }, [getReads]);

  const readNews = sortedDates && sortedDates?.length > 0 ? sortedDates : initialReadsList;

  return (
    <PageTemplate>
      <div>
        {readNews?.map((date) => (
          <Accordeon key={date} dateSeparator={date} position='readPage'>
            <NewsList
              currentItems={rebuildedNews?.filter(
                (news) => news?.publishDate !== undefined && news?.publishDate === date,
              )}
            />
          </Accordeon>
        ))}
      </div>
    </PageTemplate>
  );
};

export default ReadPage;
