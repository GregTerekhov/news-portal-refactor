import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Loader, NewsList, Pagination, PlugImage } from 'components';
import { selectLoading, fetchPopularNews } from 'redux/newsAPI';
import { useActiveLinks, useChooseRenderingNews, usePagination } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addNews, fetchAllNews, selectSavedNews } from 'redux/newsDatabase';
import { useLocation } from 'react-router-dom';
// import { saveUnsavedChanges } from 'redux/newsDatabase/newsDataBaseSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const savedNews = useAppSelector(selectSavedNews);
  const [changesHappened, setChangesHappened] = useState<boolean>(false);

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews || [],
  );

  // console.log('rebuildedNews', rebuildedNews);
  // console.log('currentItems', currentItems);

  useEffect(() => {
    dispatch(fetchPopularNews('1'));
    dispatch(fetchAllNews());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (changesHappened) {
      console.log('Клік по фаворитах, або по посиланню відбувся');
      dispatch(addNews(savedNews));
      // dispatch(saveUnsavedChanges());
      setChangesHappened(false);
    }
  }, [changesHappened]);

  const handleChangeVotes = () => {
    setChangesHappened(true);
  };

  return (
    <div>
      {isLoading && rebuildedNews && currentItems?.length === 0 ? (
        <Loader variant='page' />
      ) : (
        <>
          {rebuildedNews && rebuildedNews.length === 0 ? (
            <PlugImage variant='page' />
          ) : (
            <>
              <NewsList
                currentItems={currentItems}
                currentPage={currentPage}
                onChange={handleChangeVotes}
              />
              <Pagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
