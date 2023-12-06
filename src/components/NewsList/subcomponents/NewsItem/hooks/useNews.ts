import { useEffect, useState } from 'react';

import { VotedItem } from 'types';
import { useAuthCollector, useNewsDBCollector } from 'hooks';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
  activeLinks: {
    isHomeActive: boolean;
    isFavoriteActive: boolean;
    isReadActive: boolean;
    isArchiveActive: boolean;
  };
}

const useNews = ({ liveNews, activeLinks }: NewsItemProps) => {
  const [changesHappened, setChangesHappened] = useState<boolean>(false);
  const { savedNews, allArchive, updateSavedNews, addVotedNews, removeNews, removeFavouriteNews } =
    useNewsDBCollector();

  const [isFavourite, setIsFavourite] = useState<boolean>(() => getIsFavourite());
  const [hasRead, setHasRead] = useState<boolean>(() => getHasRead());
  const { isAuthenticated } = useAuthCollector();
  // const isAuthenticated = true;

  useEffect(() => {
    if (isAuthenticated) {
      if (!activeLinks.isArchiveActive) {
        if (savedNews && liveNews?.newsUrl !== undefined) {
          if (savedNews?.length !== 0) {
            const existingNews = savedNews.find((news) => news.newsUrl === liveNews?.newsUrl);
            const savedFavourite = existingNews?.isFavourite;
            const savedRead = existingNews?.hasRead;

            if (savedFavourite === true && savedRead === true) {
              setIsFavourite(true);
              setHasRead(true);
            }
            if (savedFavourite === true && savedRead === false) {
              setIsFavourite(true);
            }
            if (savedRead === true && savedFavourite === false) {
              setHasRead(true);
            }
          } else {
            return;
          }
        }
      } else if (activeLinks.isArchiveActive && allArchive && allArchive.length !== 0) {
        const existingFavourite = allArchive.find(
          (news) => news.isFavourite === liveNews.isFavourite,
        );
        const existingRead = allArchive.find((news) => news.hasRead === liveNews.hasRead);
        const savedFavourite = existingFavourite?.isFavourite;
        const savedRead = existingRead?.hasRead;

        if (savedFavourite && savedRead) {
          setIsFavourite(true);
          setHasRead(true);
        }
        if (savedFavourite && !savedRead) {
          setIsFavourite(true);
          setHasRead(false);
        }
        if (savedRead && !savedFavourite) {
          setHasRead(true);
          setIsFavourite(false);
        }
      }
    }
  }, [savedNews, allArchive, isAuthenticated, liveNews]);

  useEffect(() => {
    if (changesHappened && savedNews) {
      addVotedNews(savedNews);
      setChangesHappened(false);
    }
  }, [changesHappened, addVotedNews]);

  const handleChangeVotes = () => {
    setChangesHappened(true);
  };

  function getIsFavourite(): boolean {
    if (!activeLinks.isArchiveActive) {
      const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.isFavourite ?? false;
    } else {
      const existingNews = allArchive?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.isFavourite ?? false;
    }
  }

  function getHasRead(): boolean {
    if (!activeLinks.isArchiveActive) {
      const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.hasRead ?? false;
    } else {
      const existingNews = allArchive?.find((news) => news.newsUrl === liveNews?.newsUrl);
      return existingNews?.hasRead ?? false;
    }
  }

  const handleChangeFavourites = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!activeLinks.isArchiveActive) handleChangeVotes();

    if (savedNews && liveNews && liveNews?.newsUrl !== undefined && !activeLinks.isArchiveActive) {
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
  };

  const handleReadNews = async () => {
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
  };

  const handleDeleteNews = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    await removeNews(id);
  };

  return {
    isFavourite,
    hasRead,
    handleChangeFavourites,
    handleReadNews,
    handleDeleteNews,
  };
};

export default useNews;
