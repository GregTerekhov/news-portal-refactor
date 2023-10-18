const calculatePages = (results: number, cardsPerPage: number): number[] => {
  const pages: number[] = [];
  let remainingResults: number = results;
  let isFirstPage: boolean = true;

  while (remainingResults > 0) {
    if (isFirstPage) {
      // Перша сторінка має менше новин
      pages.push(cardsPerPage - 1);
      remainingResults -= cardsPerPage - 1;
      isFirstPage = false;
    } else {
      pages.push(cardsPerPage);
      remainingResults -= cardsPerPage;
    }
  }
  return pages;
};

export default calculatePages;
