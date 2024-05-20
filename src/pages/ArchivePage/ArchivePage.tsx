import React, { FC, useEffect } from 'react';

import { VariantsAccordion } from 'types';

import { useDBRedux } from 'reduxStore/hooks';
import { PageTemplate } from '../template';

import { NewsList } from 'components';
import { Accordeon } from 'ui';
import { ArchiveHistoryLog } from './subcomponents';

import { organiseNewsByMonth } from './assistants';

const ArchivePage: FC = () => {
  const { allArchive, archiveHistoryLog, getHistoryLog, getArchives } = useDBRedux();

  useEffect(() => {
    getArchives();
    getHistoryLog();
  }, [getArchives, getHistoryLog]);

  const organisedNews = organiseNewsByMonth(allArchive);

  return (
    <PageTemplate>
      <ArchiveHistoryLog logData={archiveHistoryLog} />
      {archiveHistoryLog?.length === 0 ? (
        <p className='mb-5 text-right text-darkBase dark:text-whiteBase'>
          This log will include your deleted news
        </p>
      ) : null}
      {Object.entries(organisedNews)
        .reverse()
        .map(([monthYear, newsList]) => (
          <Accordeon key={monthYear} dateSeparator={monthYear} position={VariantsAccordion.Archive}>
            <NewsList currentItems={newsList} />
          </Accordeon>
        ))}
    </PageTemplate>
  );
};

export default ArchivePage;
