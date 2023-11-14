import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useAppDispatch } from 'reduxStore/hooks';
import { addNews } from 'reduxStore/newsDatabase';

import { useNewsDBCollector } from 'hooks';

import { Accordeon, Loader, NewsList, PlugImage } from 'components';
// import { saveUnsavedChanges } from 'reduxStore/newsDatabase/newsDataBaseSlice';

const ReadPage = () => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);

  const { allReads, isLoadingDBData, savedNews, getReads } = useNewsDBCollector();

  const dispatch = useAppDispatch();

  useEffect(() => {
    getReads();
  }, []);

  useLayoutEffect(() => {
    if (changesHappened && savedNews) {
      dispatch(addNews(savedNews));
      // dispatch(saveUnsavedChanges());
      setChangesHappened(false);
    }
  }, [changesHappened]);

  const handleChangeVotes = () => {
    setChangesHappened(true);
  };

  const publishedDate = allReads
    .map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  // Використовуємо Set для визначення унікальних дат
  const uniqueDatesSet = new Set(publishedDate);

  // Перетворення і сортування дат
  const sortedDates = Array.from(uniqueDatesSet).sort().reverse();

  const shouldShowLoader = isLoadingDBData;
  const shouldShowAccordeon = !isLoadingDBData && allReads && allReads?.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader variant='page' />}
      {shouldShowAccordeon && (
        <div>
          {sortedDates.map((date) => (
            <Accordeon key={date} publishedDate={date} position='readPage'>
              <NewsList
                onChange={handleChangeVotes}
                currentItems={allReads?.filter(
                  (news) => news?.publishDate !== undefined && news?.publishDate === date,
                )}
              />
            </Accordeon>
          ))}
        </div>
      )}
      {!shouldShowLoader && !shouldShowAccordeon && allReads?.length === 0 && (
        <PlugImage variant='page' />
      )}
    </>
  );
};

export default ReadPage;
