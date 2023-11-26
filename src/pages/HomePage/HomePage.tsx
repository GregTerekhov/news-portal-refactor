import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAdditionalRequest,
  useAuthCollector,
  useChooseRenderingNews,
  useNewsAPICollector,
  useNewsDBCollector,
} from 'hooks';

import { Loader, NewsList, PlugImage } from 'components';

import { Pagination } from './subcomponents';
import { usePagination } from './hooks';

const HomePage: FC = () => {
  const { isLoadingAPIData, fetchPopular } = useNewsAPICollector();
  const { isLoadingDBData, getSavedNews } = useNewsDBCollector();
  const { isAuthenticated } = useAuthCollector();
  const { headline } = useAdditionalRequest();
  // const [changesHappened, setChangesHappened] = useState<boolean>(false);
  // const isLoadingDBData = true;
  // const isLoadingAPIData = true;
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });
  const { currentItems, currentPage, pageNumbers, setCurrentPage } = usePagination(
    rebuildedNews ?? [],
  );

  useEffect(() => {
    fetchPopular('1');

    if (isAuthenticated) {
      getSavedNews();
    }
  }, [fetchPopular, getSavedNews, isAuthenticated]);

  // useLayoutEffect(() => {
  //   if (changesHappened) {
  //     addVotedNews(savedNews);
  //     setChangesHappened(false);
  //   }
  // }, [changesHappened, addVotedNews]);

  // const handleChangeVotes = () => {
  //   setChangesHappened(true);
  // };

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
              <h2 className='dark:text-whiteBase text-giant font-bold mb-6'>
                {headline && headline}
              </h2>
              <NewsList
                currentItems={currentItems}
                currentPage={currentPage}
                // onChange={handleChangeVotes}
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
