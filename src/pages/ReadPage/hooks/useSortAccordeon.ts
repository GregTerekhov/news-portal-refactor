// import { PartialVotedNewsArray } from 'types';

// export const useReadSortOrder = (order: string) => order;

// export const useReadSortArray = (array: string[]) => array;

// export const useReadSort = (array: string[], order: string) => {};

// const useSortAccordeon = (arr: PartialVotedNewsArray, order: string) => {
//   const publishedDate = arr
//     ?.map((news) => news.publishDate)
//     .filter((date) => date !== undefined) as string[];

//   // Використовуємо Set для визначення унікальних дат
//   const uniqueDatesSet = new Set(publishedDate);
//   const sortedDates = Array.from(uniqueDatesSet);

//   if (order === 'asc') {
//     // Перетворення і сортування дат
//     sortedDates.sort().reverse();
//   } else if (order === 'desc') {
//     sortedDates.sort();
//   }
//   return { sortedDates };
// };

// export default useSortAccordeon;
