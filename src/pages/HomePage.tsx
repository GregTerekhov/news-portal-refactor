import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchPopularNews } from 'reduxStore/newsAPI';
import {
  useActiveLinks,
  useAuthCollector,
  useChooseRenderingNews,
  useNewsAPICollector,
  useNewsDBCollector,
  usePagination,
} from 'hooks';
import { useAppDispatch } from 'reduxStore/hooks';
import { addNews, fetchAllNews } from 'reduxStore/newsDatabase';
// import { saveUnsavedChanges } from 'reduxStore/newsDatabase/newsDataBaseSlice';

import { Loader, NewsList, Pagination, PlugImage } from 'components';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isLoadingAPIData } = useNewsAPICollector();
  const { savedNews, isLoadingDBData } = useNewsDBCollector();
  const [changesHappened, setChangesHappened] = useState<boolean>(false);

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );

  const { isLoggedIn } = useAuthCollector();

  // console.log('rebuildedNews', rebuildedNews);
  // console.log('currentItems', currentItems);

  useEffect(() => {
    dispatch(fetchPopularNews('1'));

    if (isLoggedIn) {
      dispatch(fetchAllNews());
    }
  }, [dispatch, isLoggedIn]);

  useLayoutEffect(() => {
    if (changesHappened) {
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
      {isLoadingAPIData || (isLoadingDBData && rebuildedNews && currentItems?.length === 0) ? (
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
