const calculatePages = (results: number, cardsPerPage: number): number[] => {
  const pages: number[] = [];
  let remainingResults: number = results;
  let isFirstPage: boolean = true;

  while (remainingResults > 0) {
    const itemsOnPage = isFirstPage
      ? Math.max(cardsPerPage - 1, 1)
      : Math.min(cardsPerPage, remainingResults);
    pages.push(itemsOnPage);
    remainingResults -= itemsOnPage;
    isFirstPage = false;
  }
  return pages;
};

export default calculatePages;
