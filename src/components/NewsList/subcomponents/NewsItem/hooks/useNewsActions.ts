import { useCallback, useEffect, useState } from 'react';

import { useDB } from 'reduxStore/hooks';

import { VotedItem } from 'types';

import { useNotification, useScrollBodyContext } from 'contexts';

type NewsActionHookProps = {
  isArchiveActive: boolean;
  isAuthenticated: boolean;
  liveNews: Partial<VotedItem>;
  setIsFavourite: (value: React.SetStateAction<boolean>) => void;
  setHasRead: (value: React.SetStateAction<boolean>) => void;
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

  const clickDate = new Date().getTime();

  const handleAddToFavourites = async (): Promise<void> => {
    setIsFavourite(true);

    const updatedData = {
      ...liveNews,
      isFavourite: true,
      additionDate: clickDate,
    };

    await updateSavedNews(updatedData);
  };

  const handleToggleFavourites = async (): Promise<void> => {
    setIsFavourite(!savedFavourite);

    if (!savedFavourite && savedRead) {
      const updatedData = { ...liveNews, isFavourite: true };
      await updateSavedNews(updatedData);
    } else if (savedFavourite && !savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: false,
        hasRead: savedRead,
        additionDate: null,
      };
      await updateSavedNews(updatedData);
      removeFavouriteNews(liveNews?.newsUrl || '');
    } else if (savedFavourite && savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: false,
        hasRead: savedRead,
      };
      await updateSavedNews(updatedData);
      removeFavouriteNews(liveNews?.newsUrl || '');
    }
  };

  const handleChangeFavourites = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
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
    },
    [
      shouldMakeChanges,
      existingNews,
      savedNews,
      handleChangeVotes,
      handleAddToFavourites,
      handleToggleFavourites,
    ],
  );

  const handleReadNews = useCallback(async (): Promise<void> => {
    if (shouldMakeChanges) {
      if (savedNews.length === 0 || !existingNews) {
        setHasRead(true);
        handleChangeVotes();

        const updatedData = {
          ...liveNews,
          hasRead: true,
          additionDate: clickDate,
        };
        await updateSavedNews(updatedData);
      } else {
        if (!savedRead && savedFavourite) {
          setHasRead(true);
          handleChangeVotes();

          const updatedData = {
            ...liveNews,
            hasRead: true,
          };
          await updateSavedNews(updatedData);
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
