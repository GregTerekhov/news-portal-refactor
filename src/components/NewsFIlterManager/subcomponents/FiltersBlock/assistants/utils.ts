import { Filters, PartialVotedNewsArray } from 'types';

export function applyCrossFilters(newsArray: PartialVotedNewsArray | undefined, filters: Filters) {
  const { keyword, title, author, publisher, materialType, selectedFilterDate } = filters;

  if (newsArray && newsArray.length > 0) {
    return newsArray.filter((news) => {
      const keywordMatch = keyword
        ? news?.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          news?.description?.toLowerCase().includes(keyword.toLowerCase())
        : false;
      const matchesTitle = title ? news?.title?.toLowerCase().includes(title.toLowerCase()) : false;
      const matchesAuthor = author
        ? news?.author?.toLowerCase().includes(author.toLowerCase())
        : false;
      const matchesPublisher = publisher
        ? news?.edition?.toLowerCase().includes(publisher.toLowerCase())
        : false;
      const matchMaterialType = materialType
        ? news?.materialType?.toLowerCase().includes(materialType.toLowerCase())
        : false;
      const matchPublishedDate =
        selectedFilterDate !== '' && selectedFilterDate
          ? news?.publishDate?.includes(selectedFilterDate)
          : false;

      return (
        keywordMatch ||
        matchesAuthor ||
        matchesPublisher ||
        matchesTitle ||
        matchMaterialType ||
        matchPublishedDate
      );
    });
  }
  return [];
}
