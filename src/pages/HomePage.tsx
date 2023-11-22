import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAuthCollector,
  useChooseRenderingNews,
  useNewsAPICollector,
  useNewsDBCollector,
  usePagination,
} from 'hooks';

import { Loader, NewsList, Pagination, PlugImage } from 'components';

const HomePage: FC = () => {
  const { isLoadingAPIData, fetchPopular } = useNewsAPICollector();
  const { savedNews, isLoadingDBData, getSavedNews, addVotedNews } = useNewsDBCollector();
  const [changesHappened, setChangesHappened] = useState<boolean>(false);

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );
  const { isAuthenticated } = useAuthCollector();

  useEffect(() => {
    fetchPopular('1');

    if (isAuthenticated) {
      getSavedNews();
    }
  }, [fetchPopular, getSavedNews, isAuthenticated]);

  useLayoutEffect(() => {
    if (changesHappened) {
      addVotedNews(savedNews);
      setChangesHappened(false);
    }
  }, [changesHappened, addVotedNews]);

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
              <h2 className='dark:text-whiteBase text-giant font-bold mb-6'>Popular News</h2>
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
