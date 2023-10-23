import { Loader, NewsList, PlugImage } from 'components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchRead, selectAllReads, selectLoading } from 'redux/newsDatabase';

const ReadPage = () => {
  const dispatch = useAppDispatch();
  const readNews = useAppSelector(selectAllReads);
  const isLoading = useAppSelector(selectLoading);

  console.log(readNews);

  useEffect(() => {
    dispatch(fetchRead());
  }, [dispatch]);

  return (
    <>
      {isLoading && readNews && readNews.length === 0 ? (
        <Loader />
      ) : !isLoading && readNews && readNews.length === 0 ? (
        <PlugImage variant='page' />
      ) : (
        <NewsList currentItems={readNews} />
      )}
    </>
  );
};

export default ReadPage;
