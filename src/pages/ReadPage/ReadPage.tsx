import React, { FC, useEffect } from 'react';

import { VariantsAccordion } from 'types';

import { useDBRedux } from 'reduxStore/hooks';
import { useReadSortStateContext } from 'contexts';
import { PageTemplate } from '../template';

import { NewsList } from 'components';
import { Accordeon } from 'ui';

import { useChooseRenderingNews, useReadNewsContent } from 'hooks';

const ReadPage: FC = () => {
  const { getReads } = useDBRedux();
  const { sortedDates } = useReadSortStateContext();

  const initialReadsList = useReadNewsContent();
  const { rebuiltNews } = useChooseRenderingNews();

  useEffect(() => {
    getReads();
  }, [getReads]);

  const readNews = sortedDates && sortedDates?.length > 0 ? sortedDates : initialReadsList;

  return (
    <PageTemplate>
      <div>
        {Array.isArray(readNews) &&
          readNews.map((date) => (
            <Accordeon key={date} dateSeparator={date} position={VariantsAccordion.Read}>
              <NewsList
                currentItems={rebuiltNews?.filter(
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
