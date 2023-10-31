import { Accordeon, Loader, NewsList, PlugImage } from 'components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchRead, selectAllReads, selectLoading } from 'redux/newsDatabase';

const ReadPage = () => {
  const dispatch = useAppDispatch();
  const readNews = useAppSelector(selectAllReads);
  const isLoading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchRead());
  }, [dispatch]);

  const publishedDate = readNews
    .map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  // Використовуємо Set для визначення унікальних дат
  const uniqueDatesSet = new Set(publishedDate);

  // Перетворення і сортування дат
  const sortedDates = Array.from(uniqueDatesSet).sort().reverse();

  const shouldShowLoader = isLoading;
  const shouldShowAccordeon = !isLoading && readNews.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader />}
      {shouldShowAccordeon && (
        <div>
          {sortedDates.map((date) => (
            <Accordeon key={date} publishedDate={date}>
              <NewsList
                currentItems={readNews?.filter(
                  (news) => news?.publishDate !== undefined && news?.publishDate === date,
                )}
              />
            </Accordeon>
          ))}
        </div>
      )}
      {!shouldShowLoader && !shouldShowAccordeon && <PlugImage variant='page' />}
    </>
  );
};

export default ReadPage;
