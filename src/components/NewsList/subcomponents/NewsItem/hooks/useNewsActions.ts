import { useCallback, useEffect, useState } from 'react';

import type { SavedNewsOptions, VotedItem } from 'types';

import { useDBRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { useActiveLinks } from 'hooks';
import { createUpdatedFavouritesObject, createUpdatedReadObject } from '../assistants';

type NewsActionHookProps = {
  liveNews: Partial<VotedItem>;
  isFavourite: boolean;
  setIsFavourite: (isFavourite: boolean) => void;
  setHasRead: (hasRead: boolean) => void;
  getNewsState: () => SavedNewsOptions;
};

const useNewsActions = ({
  liveNews,
  isFavourite,
  setIsFavourite,
  setHasRead,
  getNewsState,
}: NewsActionHookProps) => {
  const [changesHappened, setChangesHappened] = useState(false);

  const {
    savedNews,
    requestStatus,
    updateSavedNews,
    addVotedNews,
    removeNews,
    removeFavouriteNews,
  } = useDBRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { isArchiveActive, isFavoriteActive } = useActiveLinks();

  //Запит toggle новини до фаворитів, або додавання до прочитанних
  useEffect(() => {
    const updateNews = async () => {
      if (changesHappened) {
        await addVotedNews(savedNews);
        setChangesHappened(false);

        if (isFavoriteActive && liveNews?.newsUrl) removeFavouriteNews(liveNews.newsUrl);
      }
    };

    updateNews();
  }, [changesHappened, addVotedNews, isFavoriteActive]);

  const shouldMakeChanges = liveNews && liveNews?.newsUrl !== undefined && !isArchiveActive;
  const { savedFavourite, savedRead, savedAdditionDate } = getNewsState();

  const handleChangeFavourites = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    if (shouldMakeChanges) {
      setIsFavourite(!isFavourite);
      setChangesHappened(true);

      const updatedData = createUpdatedFavouritesObject({
        liveNews,
        savedFavourite,
        savedRead,
        savedAdditionDate,
      });
      if (updatedData) updateSavedNews(updatedData);
    }
  };

  const handleReadNews = useCallback((): void => {
    if (shouldMakeChanges && !savedRead) {
      setHasRead(true);
      setChangesHappened(true);

      const updatedData = createUpdatedReadObject({
        liveNews,
        savedFavourite,
        savedRead,
        savedAdditionDate,
      });

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
      await removeNews(id);
      requestStatus && showToast(requestStatus);
    } catch (error) {
      console.error('Error during removeNews: ', error);
      throw error;
    } finally {
      setIsScrollDisabled(false);
    }
  };

  return {
    handleChangeFavourites,
    handleReadNews,
    handleDeleteNews,
  };
};

export default useNewsActions;
