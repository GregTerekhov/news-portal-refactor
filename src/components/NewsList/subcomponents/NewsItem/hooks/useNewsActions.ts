import { useCallback, useEffect, useState } from 'react';

import type { VotedItem } from 'types';
import { useDBRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { useActiveLinks } from 'hooks';
import { createUpdatedFavouritesObject, createUpdatedReadObject } from '../assistants';

type NewsActionHookProps = {
  liveNews: Partial<VotedItem>;
  isFavourite: boolean;
  setIsFavourite: (isFavourite: boolean) => void;
  setHasRead: (hasRead: boolean) => void;
};

const useNewsActions = ({
  liveNews,
  isFavourite,
  setIsFavourite,
  setHasRead,
}: NewsActionHookProps) => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const {
    savedNews,
    updateSavedNews,
    addVotedNews,
    removeNews,
    // removeFavouriteNews
  } = useDBRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { isArchiveActive } = useActiveLinks();

  const shouldMakeChanges =
    !!savedNews?.length && liveNews && liveNews?.newsUrl !== undefined && !isArchiveActive;

  useEffect(() => {
    const updateNews = async () => {
      if (changesHappened && savedNews.length > 0) {
        await addVotedNews(savedNews);
        setChangesHappened(false);
      }
    };

    updateNews();
  }, [changesHappened, addVotedNews]);

  const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
  const savedFavourite = existingNews?.isFavourite;
  const savedRead = existingNews?.hasRead;
  const savedClickDate = existingNews?.additionDate;

  const handleChangeFavourites = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    if (shouldMakeChanges) {
      setIsFavourite(!isFavourite);
      setChangesHappened(true);

      const updatedData = createUpdatedFavouritesObject(
        liveNews,
        savedFavourite,
        savedRead,
        savedClickDate,
      );
      if (updatedData) updateSavedNews(updatedData);
    }
  };

  const handleReadNews = useCallback((): void => {
    if (shouldMakeChanges) {
      setHasRead(true);
      setChangesHappened(true);

      const updatedData = createUpdatedReadObject(
        liveNews,
        savedFavourite,
        savedRead,
        savedClickDate,
      );

      if (updatedData) updateSavedNews(updatedData);
    }
  }, [shouldMakeChanges, savedNews, updateSavedNews]);

  const handleDeleteNews = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await removeNews(id);

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during removeNews: ', error);
    } finally {
      setIsDeleted(true);
      setIsScrollDisabled(false);
    }
  };

  return {
    isDeleted,
    handleChangeFavourites,
    handleReadNews,
    handleDeleteNews,
  };
};

export default useNewsActions;
