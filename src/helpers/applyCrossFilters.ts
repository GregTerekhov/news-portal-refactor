import { Filters, PartialVotedNewsArray } from 'types';

function applyCrossFilters(newsArray: PartialVotedNewsArray | undefined, filters: Filters) {
  const { keyword, title, author, publisher, materialType } = filters;

  if (newsArray && newsArray.length > 0) {
    return newsArray.filter((news) => {
      const keywordMatch = keyword
        ? news?.title?.includes(keyword) || news?.description?.includes(keyword)
        : false;

      const matchesTitle = title ? news?.title?.includes(title) : false;
      const matchesAuthor = author ? news?.author?.includes(author) : false;
      const matchesPublisher = publisher ? news?.edition?.includes(publisher) : false;
      const matchMaterialType = materialType
        ? news?.materialType?.toLowerCase().includes(materialType.toLowerCase())
        : false;

      return keywordMatch || matchesAuthor || matchesPublisher || matchesTitle || matchMaterialType;
    });
  }
  return [];
}

export default applyCrossFilters;
