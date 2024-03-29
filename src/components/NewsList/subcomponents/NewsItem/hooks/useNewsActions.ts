import { useCallback, useEffect, useState } from 'react';

import { useDB } from 'reduxStore/hooks';
import { useNotification, useScrollBodyContext } from 'contexts';

import type { VotedItem } from 'types';

type NewsActionHookProps = {
  isArchiveActive: boolean;
  isAuthenticated: boolean;
  liveNews: Partial<VotedItem>;
  setIsFavourite: (isFavourite: boolean) => void;
  setHasRead: (hasRead: boolean) => void;
};

const useNewsActions = ({
  isArchiveActive,
  liveNews,
  setIsFavourite,
  setHasRead,
}: NewsActionHookProps) => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const { savedNews, updateSavedNews, addVotedNews, removeNews, removeFavouriteNews } = useDB();

  const { showToast } = useNotification();
  const { setIsScrollDisabled } = useScrollBodyContext();

  useEffect(() => {
    if (changesHappened && savedNews) {
      addVotedNews(savedNews);
      setChangesHappened(false);
    }
  }, [changesHappened, addVotedNews]);

  const shouldMakeChanges =
    savedNews && liveNews && liveNews?.newsUrl !== undefined && !isArchiveActive;

  const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
  const savedFavourite = existingNews?.isFavourite;
  const savedRead = existingNews?.hasRead;
  const savedClickDate = existingNews?.additionDate;

  const clickDate = new Date().getTime();

  const handleAddToFavourites = useCallback((): void => {
    setIsFavourite(true);

    const updatedData = {
      ...liveNews,
      isFavourite: true,
      additionDate: clickDate,
    };

    updateSavedNews(updatedData);
  }, []);

  const handleToggleFavourites = useCallback((): void => {
    setIsFavourite(!savedFavourite);

    if (!savedFavourite && savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: true,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
      updateSavedNews(updatedData);
    } else if (savedFavourite && !savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: false,
        additionDate: null,
      };
      updateSavedNews(updatedData);
      removeFavouriteNews(liveNews?.newsUrl || '');
    } else if (savedFavourite && savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: false,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
      updateSavedNews(updatedData);
      removeFavouriteNews(liveNews?.newsUrl || '');
    }
  }, []);

  const handleChangeFavourites = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    if (shouldMakeChanges) {
      handleChangeVotes();
      if (savedNews.length === 0 || !existingNews) {
        handleAddToFavourites();
      } else {
        handleToggleFavourites();
      }
    }
  };

  const handleReadNews = useCallback((): void => {
    if (shouldMakeChanges) {
      if (savedNews.length === 0 || !existingNews) {
        setHasRead(true);
        handleChangeVotes();

        const updatedData = {
          ...liveNews,
          hasRead: true,
          additionDate: clickDate,
        };
        updateSavedNews(updatedData);
      } else {
        if (!savedRead && savedFavourite) {
          setHasRead(true);
          handleChangeVotes();

          const updatedData = {
            ...liveNews,
            isFavourite: savedFavourite,
            hasRead: true,
            additionDate: savedClickDate,
          };
          updateSavedNews(updatedData);
        } else if (savedRead === true) {
          return;
        }
      }
    }
  }, [isArchiveActive, handleChangeVotes, savedNews, updateSavedNews]);

  function handleChangeVotes() {
    setChangesHappened(true);
  }

  const handleDeleteNews = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    const response = await removeNews(id);

    showToast(response.meta.requestStatus);
    setIsDeleted(true);
    setIsScrollDisabled(false);
  };

  return {
    isDeleted,
    handleChangeFavourites,
    handleReadNews,
    handleDeleteNews,
  };
};

export default useNewsActions;
