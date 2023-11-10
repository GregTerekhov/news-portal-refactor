import { Accordeon, Loader, NewsList, PlugImage } from 'components';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  addNews,
  fetchRead,
  selectSavedNews,
  selectAllReads,
  selectLoading,
} from 'redux/newsDatabase';
// import { saveUnsavedChanges } from 'redux/newsDatabase/newsDataBaseSlice';

const ReadPage = () => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const readNews = useAppSelector(selectAllReads);
  const isLoading = useAppSelector(selectLoading);
  const savedNews = useAppSelector(selectSavedNews);

  useEffect(() => {
    dispatch(fetchRead());
  }, [dispatch]);

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

  const publishedDate = readNews
    .map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  // Використовуємо Set для визначення унікальних дат
  const uniqueDatesSet = new Set(publishedDate);

  // Перетворення і сортування дат
  const sortedDates = Array.from(uniqueDatesSet).sort().reverse();

  const shouldShowLoader = isLoading;
  const shouldShowAccordeon = !isLoading && readNews && readNews?.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader variant='page' />}
      {shouldShowAccordeon && (
        <div>
          {sortedDates.map((date) => (
            <Accordeon key={date} publishedDate={date} position='readPage'>
              <NewsList
                onChange={handleChangeVotes}
                currentItems={readNews?.filter(
                  (news) => news?.publishDate !== undefined && news?.publishDate === date,
                )}
              />
            </Accordeon>
          ))}
        </div>
      )}
      {!shouldShowLoader && !shouldShowAccordeon && readNews?.length === 0 && (
        <PlugImage variant='page' />
      )}
    </>
  );
};

export default ReadPage;
