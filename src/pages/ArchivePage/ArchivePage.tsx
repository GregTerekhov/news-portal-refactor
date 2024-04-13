import React, { FC, useEffect } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { NewsList } from 'components';
import { Accordeon } from 'ui';

import { organiseNewsByMonth } from './assistants';
import { ArchiveHistoryLog } from './subcomponents';

const ArchivePage: FC<{}> = () => {
  const { allArchive, archiveHistoryLog, getHistoryLog, getArchives } = useDBRedux();

  useEffect(() => {
    getArchives();
    getHistoryLog();
  }, [getArchives, getHistoryLog]);

  const organisedNews = organiseNewsByMonth(allArchive);

  return (
    <PageTemplate>
      {archiveHistoryLog?.length > 0 ? <ArchiveHistoryLog logData={archiveHistoryLog} /> : null}
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
