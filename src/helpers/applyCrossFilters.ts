import type { Filters, PartialVotedNewsArray } from 'types';

// Function to check if a date is within a given range
function isDateWithinRange(
  dateString: string | undefined,
  startDate: string,
  endDate: string,
): boolean {
  if (!dateString) return false;

  return dateString >= startDate && dateString <= endDate;
}

// Function to news' cross-filtering
export default function applyCrossFilters(
  newsArray: PartialVotedNewsArray | undefined,
  filters: Filters,
): PartialVotedNewsArray {
  if (!newsArray || newsArray.length === 0 || !filters) {
    return [];
  }

  const { keyword, title, author, publisher, materialType, selectedFilterDate } = filters;

  const regexFilters = {
    keyword: keyword ? new RegExp(keyword, 'i') : null,
    title: title ? new RegExp(title, 'i') : null,
    author: author ? new RegExp(author, 'i') : null,
    publisher: publisher ? new RegExp(publisher, 'i') : null,
    materialType: materialType ? new RegExp(materialType, 'i') : null,
  };

  return newsArray.filter((news) => {
    const keywordMatch =
      regexFilters.keyword &&
      (news?.title?.match(regexFilters.keyword) || news?.description?.match(regexFilters.keyword));
    const matchesTitle = regexFilters.title && news?.title?.match(regexFilters.title);
    const matchesAuthor = regexFilters.author && news?.author?.match(regexFilters.author);
    const matchesPublisher = regexFilters.publisher && news?.edition?.match(regexFilters.publisher);
    const matchMaterialType =
      regexFilters.materialType && news?.materialType?.match(regexFilters.materialType);

    const matchPublishedDate =
      selectedFilterDate.startDate !== '' && selectedFilterDate.endDate !== ''
        ? isDateWithinRange(
            news?.publishDate,
            selectedFilterDate.startDate,
            selectedFilterDate.endDate,
          )
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
