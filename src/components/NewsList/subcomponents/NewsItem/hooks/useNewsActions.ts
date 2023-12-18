import { useCallback, useEffect, useState } from 'react';

import { DeleteNewsResponse, VotedItem } from 'types';

import { useNotification } from 'contexts';
import { useNewsDBCollector } from 'hooks';
import { ActiveLinks } from 'hooks/useActiveLinks';

type NewsActionHookProps = {
  activeLinks: ActiveLinks;
  isAuthenticated: boolean;
  liveNews: Partial<VotedItem>;
  setIsFavourite: (value: React.SetStateAction<boolean>) => void;
  setHasRead: (value: React.SetStateAction<boolean>) => void;
};

const useNewsActions = ({
  activeLinks,
  liveNews,
  setIsFavourite,
  setHasRead,
}: NewsActionHookProps) => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const { savedNews, updateSavedNews, addVotedNews, removeNews, removeFavouriteNews } =
    useNewsDBCollector();
  const { setOpenToast } = useNotification();

  useEffect(() => {
    if (changesHappened && savedNews) {
      addVotedNews(savedNews);
      setChangesHappened(false);
    }
  }, [changesHappened, addVotedNews]);

  const handleChangeFavourites = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (!activeLinks.isArchiveActive) handleChangeVotes();

      if (
        savedNews &&
        liveNews &&
        liveNews?.newsUrl !== undefined &&
        !activeLinks.isArchiveActive
      ) {
        const currentTime = new Date();
        const clickDate = currentTime.getTime();

        if (savedNews.length === 0) {
          setIsFavourite(true);

          const updatedData = {
            ...liveNews,
            isFavourite: true,
            hasRead: false,
            additionDate: clickDate,
          };
          await updateSavedNews(updatedData);
        } else {
          const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
          const savedFavourite = existingNews?.isFavourite;
          const savedRead = existingNews?.hasRead;

          if (!existingNews) {
            setIsFavourite(true);

            const updatedData = {
              ...liveNews,
              isFavourite: true,
              hasRead: false,
              additionDate: clickDate,
            };
            await updateSavedNews(updatedData);
          } else {
            if (savedFavourite === false && savedRead === true) {
              setIsFavourite(true);

              const updatedData = { ...liveNews, isFavourite: true };
              await updateSavedNews(updatedData);
            } else if (savedFavourite === true && savedRead === false) {
              setIsFavourite(false);

              const updatedData = {
                ...liveNews,
                isFavourite: false,
                hasRead: savedRead,
                additionDate: null,
              };
              await updateSavedNews(updatedData);
              removeFavouriteNews(liveNews?.newsUrl || '');
            } else if (savedFavourite === true && savedRead === true) {
              setIsFavourite(false);

              const updatedData = {
                ...liveNews,
                isFavourite: false,
                hasRead: savedRead,
              };
              await updateSavedNews(updatedData);
              removeFavouriteNews(liveNews?.newsUrl || '');
            }
          }
        }
      }
    },
    [
      activeLinks.isArchiveActive,
      handleChangeVotes,
      savedNews,
      updateSavedNews,
      removeFavouriteNews,
    ],
  );

  const handleReadNews = useCallback(async () => {
    if (savedNews && liveNews && liveNews?.newsUrl !== undefined && !activeLinks.isArchiveActive) {
      const currentTime = new Date();
      const clickDate = currentTime.getTime();

      if (savedNews.length === 0) {
        setHasRead(true);
        handleChangeVotes();

        const updatedData = {
          ...liveNews,
          hasRead: true,
          isFavourite: false,
          additionDate: clickDate,
        };
        await updateSavedNews(updatedData);
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setHasRead(true);
          handleChangeVotes();

          const updatedData = {
            ...liveNews,
            hasRead: true,
            additionDate: clickDate,
          };
          await updateSavedNews(updatedData);
        } else {
          if (savedRead === false && savedFavourite === true) {
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
    }
  }, [activeLinks.isArchiveActive, handleChangeVotes, savedNews, updateSavedNews]);

  function handleChangeVotes() {
    setChangesHappened(true);
  }

  const handleDeleteNews = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const response = await removeNews(id);

    const payload = response.payload as DeleteNewsResponse;
    const { message } = payload;

    if (message && message === 'Remove news success') {
      setOpenToast(true);
      setIsDeleted(true);
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
