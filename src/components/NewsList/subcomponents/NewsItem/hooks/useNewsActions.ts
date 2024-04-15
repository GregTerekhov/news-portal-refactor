import { useCallback, useEffect, useState } from 'react';

import type { VotedItem } from 'types';
import { useDBRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { useActiveLinks } from 'hooks';

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

  const { savedNews, updateSavedNews, addVotedNews, removeNews, removeFavouriteNews } =
    useDBRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { isArchiveActive } = useActiveLinks();

  const shouldMakeChanges =
    !!savedNews?.length && liveNews && liveNews?.newsUrl !== undefined && !isArchiveActive;

  useEffect(() => {
    const updateNews = async () => {
      if (changesHappened && savedNews.length > 0) {
        console.log('changesHappened', changesHappened);
        await addVotedNews(savedNews);
        setChangesHappened(false);
        console.log('savedNews', savedNews);
      }
    };

    updateNews();
  }, [changesHappened, addVotedNews]);

  const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
  const savedFavourite = existingNews?.isFavourite;
  const savedRead = existingNews?.hasRead;
  const savedClickDate = existingNews?.additionDate;

  const clickDate = new Date().getTime();

  const handleAddToFavourites = (): void => {
    setIsFavourite(!isFavourite);
    setChangesHappened(true);

    const updatedData = {
      ...liveNews,
      isFavourite: !savedFavourite,
      additionDate: clickDate,
    };

    updateSavedNews(updatedData);
  };

  const handleToggleFavourites = (): void => {
    setIsFavourite(!isFavourite);
    setChangesHappened(true);
    console.log('changesHappened', changesHappened);

    if (!savedFavourite && savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: !savedFavourite,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
      updateSavedNews(updatedData);
    } else if (savedFavourite && !savedRead) {
      console.log('savedFavourite && !savedRead');
      const updatedData = {
        ...liveNews,
        isFavourite: !savedFavourite,
        additionDate: null,
      };

      updateSavedNews(updatedData);
      removeFavouriteNews(liveNews?.newsUrl || '');
    } else if (savedFavourite && savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: !savedFavourite,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
      updateSavedNews(updatedData);
      removeFavouriteNews(liveNews?.newsUrl || '');
    }
  };

  const handleChangeFavourites = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    if (shouldMakeChanges) {
      savedNews.length === 0 || !existingNews ? handleAddToFavourites() : handleToggleFavourites();
    }
  };

  const handleReadNews = useCallback((): void => {
    if (shouldMakeChanges) {
      if (savedNews.length === 0 || !existingNews) {
        setHasRead(true);
        setChangesHappened(true);

        const updatedData = {
          ...liveNews,
          hasRead: true,
          additionDate: clickDate,
        };
        updateSavedNews(updatedData);
      } else {
        if (!savedRead && savedFavourite) {
          setHasRead(true);
          setChangesHappened(true);

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
  }, [isArchiveActive, savedNews, updateSavedNews]);

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
