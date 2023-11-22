import React, { FC } from 'react';

import { useNewsDBCollector } from 'hooks';

import { NewsList } from 'components';
import { Accordeon } from 'ui';

import { organiseNewsByMonth } from './assistants';

const ArchivePage: FC<{}> = () => {
  const { savedNews } = useNewsDBCollector();

  const organisedNews = organiseNewsByMonth(savedNews);

  return (
    <>
      {Object.entries(organisedNews).map(([monthYear, newsList]) => (
        <Accordeon key={monthYear} dateSeparator={monthYear} position='archivePage'>
          <NewsList currentItems={newsList} />
        </Accordeon>
      ))}
    </>
  );
};

export default ArchivePage;
