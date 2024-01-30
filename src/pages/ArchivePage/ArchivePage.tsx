import React, { FC, useEffect } from 'react';

import { useAppSelector, useAuthRedux, useDB } from 'reduxStore/hooks';

import { useNotification } from 'contexts';

import { NewsList } from 'components';
import { Accordeon, Loader, Notification, PlugImage } from 'ui';

import { organiseNewsByMonth } from './assistants';
import { ArchiveHistoryLog } from './subcomponents';
import { selectHasAPIError } from 'reduxStore/newsAPI';
import { useNavigate } from 'react-router-dom';

const ArchivePage: FC<{}> = () => {
  const { isLoadingDBData, allArchive, archiveHistoryLog, getHistoryLog, getArchives } = useDB();
  const { isAuthenticated } = useAuthRedux();
  const { openToast, setOpenToast } = useNotification();

  const errorAPI = useAppSelector(selectHasAPIError);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorAPI && typeof errorAPI === 'number') {
      if (errorAPI >= 500) {
        navigate('/serverError');
      }
    }
  }, [errorAPI]);

  useEffect(() => {
    getArchives();
    getHistoryLog();
  }, [getArchives, getHistoryLog]);

  // const isAuthenticated = true;
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
        {openToast && (
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
