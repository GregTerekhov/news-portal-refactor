import React, { FC, useEffect } from 'react';

import { useNewsDBCollector } from 'hooks';

import { Loader, NewsList, PlugImage } from 'components';
import { Accordeon } from 'ui';

import { organiseNewsByMonth } from './assistants';
import { ArchiveHistoryLog } from './subcomponents';

const ArchivePage: FC<{}> = () => {
  const { isLoadingDBData, allArchive, archiveHistoryLog, getHistoryLog, getArchives } =
    useNewsDBCollector();
  // const { isAuthenticated } = useAuthCollector();

  useEffect(() => {
    getArchives();
    getHistoryLog();
  }, [getArchives, getHistoryLog]);

  const isAuthenticated = true;

  const organisedNews = organiseNewsByMonth(allArchive);

  const shouldShowLoader = isLoadingDBData;
  const shouldShowContent = !isLoadingDBData && allArchive.length !== 0;

  return (
    isAuthenticated && (
      <>
        {shouldShowLoader && <Loader variant='generalSection' />}
        {shouldShowContent && (
          <>
            <ArchiveHistoryLog logData={archiveHistoryLog} />
            {Object.entries(organisedNews).map(([monthYear, newsList]) => (
              <Accordeon key={monthYear} dateSeparator={monthYear} position='archivePage'>
                <NewsList currentItems={newsList} />
              </Accordeon>
            ))}
          </>
        )}
        {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
      </>
    )
  );
};

export default ArchivePage;
