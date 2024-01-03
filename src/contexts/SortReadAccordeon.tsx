import useActiveLinks from 'hooks/useActiveLinks';
import useChooseRenderingNews from 'hooks/useChooseRenderingNews';
import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

type ReadSortProviderProps = {
  children: ReactNode;
};

type ReadSortValue = {
  sortedDates: string[] | undefined;
  setSortedDates: (value: string[]) => void;
};

export const ReadSortContext = createContext<ReadSortValue | undefined>(undefined);

export const useReadNewsContent = () => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const publishedDate = rebuildedNews
    ?.map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  const uniqueDatesSet = new Set(publishedDate);
  const readNews = Array.from(uniqueDatesSet).sort().reverse();

  if (readNews) {
    return readNews as string[];
  }

  return null;
};

export const ReadSortProvider: FC<ReadSortProviderProps> = ({ children }) => {
  const [sortedDates, setSortedDates] = useState<string[] | undefined>(undefined);

  return (
    <ReadSortContext.Provider value={{ sortedDates, setSortedDates }}>
      {children}
    </ReadSortContext.Provider>
  );
};

export const useReadSortState = () => {
  const context = useContext(ReadSortContext);

  if (!context) throw new Error('useReadSortState must be used within a FiltersProvider');

  return context;
};
