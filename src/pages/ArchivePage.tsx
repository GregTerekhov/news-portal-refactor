import React, { FC } from 'react';

import { organiseNewsByMonth } from 'helpers';
import { useNewsDBCollector } from 'hooks';

import { Accordeon, NewsList } from 'components';

const ArchivePage: FC = () => {
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
