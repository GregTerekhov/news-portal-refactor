import React, { FC, useEffect } from 'react';

import { useAuthRedux, useDB } from 'reduxStore/hooks';

import { NewsList, Toast } from 'components';
import { Accordeon, Loader, PlugImage } from 'ui';

import { organiseNewsByMonth } from './assistants';
import { ArchiveHistoryLog } from './subcomponents';
import { useNavigate } from 'react-router-dom';

const ArchivePage: FC<{}> = () => {
  const {
    dbSuccessMessage,
    isLoadingDBData,
    allArchive,
    archiveHistoryLog,
    errorDB,
    getHistoryLog,
    getArchives,
  } = useDB();
  const { isAuthenticated } = useAuthRedux();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorDB && errorDB >= 500) {
      navigate('/serverError');
    }
  }, [errorDB]);

  useEffect(() => {
    getArchives();
    getHistoryLog();
  }, [getArchives, getHistoryLog]);

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
            {Object.entries(organisedNews)
              .reverse()
              .map(([monthYear, newsList]) => (
                <Accordeon key={monthYear} dateSeparator={monthYear} position='archivePage'>
                  <NewsList currentItems={newsList} />
                </Accordeon>
              ))}
          </>
        )}
        {!shouldShowLoader && !shouldShowContent && <PlugImage variant='page' />}
        {dbSuccessMessage === 'Remove news success' && (
          <Toast variant='interactive' status='success' />
        )}
      </>
    )
  );
};

export default ArchivePage;
