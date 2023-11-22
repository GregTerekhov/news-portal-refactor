import { Filters, PartialVotedNewsArray } from 'types';

export function applyCrossFilters(newsArray: PartialVotedNewsArray | undefined, filters: Filters) {
  const { keyword, title, author, publisher, materialType, selectedFilterDate } = filters;

  if (newsArray && newsArray.length > 0) {
    return newsArray.filter((news) => {
      console.log('newsArray', newsArray);
      const keywordMatch = keyword
        ? news?.title?.includes(keyword) || news?.description?.includes(keyword)
        : false;

      const matchesTitle = title ? news?.title?.includes(title) : false;
      const matchesAuthor = author ? news?.author?.includes(author) : false;
      const matchesPublisher = publisher ? news?.edition?.includes(publisher) : false;
      const matchMaterialType = materialType
        ? news?.materialType?.toLowerCase().includes(materialType.toLowerCase())
        : false;
      const matchPublishedDate =
        selectedFilterDate !== '' && selectedFilterDate
          ? news?.publishDate?.includes(selectedFilterDate)
          : false;
      console.log('matchPublishedDate', matchPublishedDate);
      console.log('selectedFilterDate', selectedFilterDate);

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
