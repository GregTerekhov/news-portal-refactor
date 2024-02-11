import React, { FC, useEffect } from 'react';

import { useAuthRedux, useDB } from 'reduxStore/hooks';

import { useNotification } from 'contexts';

import { NewsList } from 'components';
import { Accordeon, Loader, Notification, PlugImage } from 'ui';

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
  const { openToast, setOpenToast } = useNotification();

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

  useEffect(() => {
    if (dbSuccessMessage) {
      document.body.style.overflow = 'auto';
    }
  });

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
        {openToast && dbSuccessMessage === 'Remove news success' && (
          <Notification
            variant='non-interactive'
            openToast={openToast}
            setOpenToast={setOpenToast}
            title='Delete news'
            description='News has been successfully deleted'
          />
        )}
      </>
    )
  );
};

export default ArchivePage;
