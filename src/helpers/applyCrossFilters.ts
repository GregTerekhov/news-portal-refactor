import type { Filters, PartialVotedNewsArray, VotedItem } from 'types';

// Function to check if a date is within a given range
function isDateWithinRange(
  dateString: string | undefined,
  startDate: string,
  endDate: string,
): boolean {
  if (!dateString) return false;

  return dateString >= startDate && dateString <= endDate;
}

const applyKeywordFilter = (
  news: Partial<VotedItem>,
  regex: RegExp | null,
): RegExpMatchArray | null | undefined =>
  regex && (news?.title?.match(regex) || news?.description?.match(regex));

const applyTitleFilter = (
  news: Partial<VotedItem>,
  regex: RegExp | null,
): RegExpMatchArray | null | undefined => regex && news?.title?.match(regex);

const applyAuthorFilter = (
  news: Partial<VotedItem>,
  regex: RegExp | null,
): RegExpMatchArray | null | undefined => regex && news?.author?.match(regex);

const applyPublisherFilter = (
  news: Partial<VotedItem>,
  regex: RegExp | null,
): RegExpMatchArray | null | undefined => regex && news?.edition?.match(regex);

const applyMaterialTypeFilter = (
  news: Partial<VotedItem>,
  regex: RegExp | null,
): RegExpMatchArray | null | undefined => regex && news?.materialType?.match(regex);

const applyDateFilter = (news: Partial<VotedItem>, startDate: string, endDate: string): boolean =>
  startDate !== '' && endDate !== '' && isDateWithinRange(news?.publishDate, startDate, endDate);

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
    applyKeywordFilter(news, regexFilters.keyword) ||
      applyTitleFilter(news, regexFilters.title) ||
      applyAuthorFilter(news, regexFilters.author) ||
      applyPublisherFilter(news, regexFilters.publisher) ||
      applyMaterialTypeFilter(news, regexFilters.materialType) ||
      applyDateFilter(news, selectedFilterDate.startDate, selectedFilterDate.endDate);
  });
}
