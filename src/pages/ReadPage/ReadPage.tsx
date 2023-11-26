import React, { FC, useEffect } from 'react';

import { useNewsDBCollector } from 'hooks';

import { Loader, NewsList, PlugImage } from 'components';
import { Accordeon } from 'ui';

const ReadPage: FC<{}> = () => {
  // const [changesHappened, setChangesHappened] = useState<boolean>(false);

  const { allReads, isLoadingDBData, getReads } = useNewsDBCollector();

  useEffect(() => {
    getReads();
  }, [getReads]);

  // useLayoutEffect(() => {
  //   if (changesHappened && savedNews) {
  //     addVotedNews(savedNews);
  //     setChangesHappened(false);
  //   }
  // }, [changesHappened, addVotedNews]);

  // const handleChangeVotes = () => {
  //   setChangesHappened(true);
  // };

  const publishedDate = allReads
    ?.map((news) => news.publishDate)
    .filter((date) => date !== undefined) as string[];

  // Використовуємо Set для визначення унікальних дат
  const uniqueDatesSet = new Set(publishedDate);

  // Перетворення і сортування дат
  const sortedDates = Array.from(uniqueDatesSet).sort().reverse();

  const shouldShowLoader = isLoadingDBData;
  const shouldShowAccordeon = !isLoadingDBData && allReads && allReads?.length !== 0;

  return (
    <>
      {shouldShowLoader && <Loader variant='page' />}
      {shouldShowAccordeon && (
        <div>
          {sortedDates.map((date) => (
            <Accordeon key={date} dateSeparator={date} position='readPage'>
              <NewsList
                // onChange={handleChangeVotes}
                currentItems={allReads?.filter(
                  (news) => news?.publishDate !== undefined && news?.publishDate === date,
                )}
              />
            </Accordeon>
          ))}
        </div>
      )}
      {!shouldShowLoader && !shouldShowAccordeon && allReads?.length === 0 && (
        <PlugImage variant='page' />
      )}
    </>
  );
};

export default ReadPage;