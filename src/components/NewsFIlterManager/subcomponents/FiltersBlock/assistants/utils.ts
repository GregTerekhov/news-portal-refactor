import { Filters, PartialVotedNewsArray } from 'types';

// Function to check if a date is within a given range
function isDateWithinRange(
  dateString: string | undefined,
  startDate: string,
  endDate: string,
): boolean {
  if (!dateString) return false;

  const currentDate = new Date(dateString);
  const startRange = new Date(startDate);
  const endRange = new Date(endDate);
  console.log('currentDate', currentDate);

  return currentDate >= startRange && currentDate <= endRange;
}

export function applyCrossFilters(newsArray: PartialVotedNewsArray | undefined, filters: Filters) {
  const hasFilters = Object.values(filters);
  console.log(hasFilters);

  if (newsArray && newsArray.length > 0 && filters && hasFilters) {
    console.log('filters', filters);
    const { keyword, title, author, publisher, materialType, selectedFilterDate } = filters;
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
        selectedFilterDate.startDate !== '' && selectedFilterDate.endDate !== ''
          ? isDateWithinRange(
              news?.publishDate,
              selectedFilterDate.startDate,
              selectedFilterDate.endDate,
            )
          : false;
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
