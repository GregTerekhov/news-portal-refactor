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
    console.log('HANDLE !FAV !READ'); //срабатывает только тогда, когда новости нет в базе

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

    if (!savedFavourite && savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: !savedFavourite,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
      console.log('HANDLE !FAV READ'); //срабатывает, если новость есть в базе, прочитана, но не сохранена в избранное
      updateSavedNews(updatedData);
    } else if (savedFavourite && !savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: !savedFavourite,
        additionDate: null,
      };
      console.log('HANDLE FAV !READ'); //срабатывает, если новость есть в базе, сохранена в избранное, но не прочитана

      updateSavedNews(updatedData);
      // removeFavouriteNews(liveNews?.newsUrl || ''); //лишняя логика, из-за которой происходит двойной запрос
    } else if (savedFavourite && savedRead) {
      const updatedData = {
        ...liveNews,
        isFavourite: !savedFavourite,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
      console.log('HANDLE FAV READ'); //срабатывает, если новость есть в базе, сохранена в избранное и прочитана

      updateSavedNews(updatedData);
      // removeFavouriteNews(liveNews?.newsUrl || ''); //лишняя логика, из-за которой происходит двойной запрос
    } else if (!savedFavourite && !savedRead) {
      console.log('WE ARE HERE - HANDLE !FAV !READ'); //недостающее условие. срабатывает, если новость есть в базе, НО! НЕ сохранена в избранное, и  НЕ прочитана

      const updatedData = {
        ...liveNews,
        isFavourite: !savedFavourite,
        additionDate: null,
      };

      updateSavedNews(updatedData);
    }
  };

  const handleChangeFavourites = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    if (shouldMakeChanges) {
      console.log(existingNews);
      // При нажатии на кнопку избранного срабатывает данное распределение. На главной странице, первый раз страбатывает handleAddToFavourites, т.к. новости ещё нет в базе и savedNews.length > 0, а existingNews - undefined.
      // При нажатии на кнопку новость добовляется в базу, а её данные, вместе с url, сэтятся в стэйт.
      // При повторном нажатии будет всё время срабатывать функция handleToggleFavourites, т.к. existingNews всегда будет true, из-за стэёта.
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
