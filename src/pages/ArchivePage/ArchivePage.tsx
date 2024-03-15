import React, { FC, useEffect } from 'react';

import { useDB } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { NewsList } from 'components';
import { Accordeon } from 'ui';

import { organiseNewsByMonth } from './assistants';
import { ArchiveHistoryLog } from './subcomponents';

const ArchivePage: FC<{}> = () => {
  const { allArchive, archiveHistoryLog, getHistoryLog, getArchives } = useDB();

  useEffect(() => {
    getArchives();
    getHistoryLog();
  }, [getArchives, getHistoryLog]);

  const organisedNews = organiseNewsByMonth(allArchive);

  return (
    <PageTemplate>
      <ArchiveHistoryLog logData={archiveHistoryLog} />
      {Object.entries(organisedNews)
        .reverse()
        .map(([monthYear, newsList]) => (
          <Accordeon key={monthYear} dateSeparator={monthYear} position='archivePage'>
            <NewsList currentItems={newsList} />
          </Accordeon>
        ))}
    </PageTemplate>
  );
};

export default ArchivePage;
