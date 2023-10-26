import { Accordeon, Loader, NewsList, PlugImage } from 'components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchRead, selectAllReads, selectLoading } from 'redux/newsDatabase';

const ReadPage = () => {
  const dispatch = useAppDispatch();
  const readNews = useAppSelector(selectAllReads);
  const isLoading = useAppSelector(selectLoading);

  // console.log(readNews);

  useEffect(() => {
    dispatch(fetchRead());
  }, [dispatch]);

  const publishedDate = readNews
    .map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  const shouldShowLoader = isLoading && readNews.length === 0;
  const shouldShowAccordeon = !isLoading && readNews.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader />}
      {shouldShowAccordeon && (
        <Accordeon publishedDate={publishedDate}>
          <NewsList />
        </Accordeon>
      )}
      {!shouldShowLoader && !shouldShowAccordeon && <PlugImage variant='page' />}
    </>
  );
};

export default ReadPage;
