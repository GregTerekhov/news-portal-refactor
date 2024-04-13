import { COUNT, FIRST_PAGE, QUANTITY } from './constants';

// Розрахунок кількості сторінок для кожного типу пристрою
const calculatePagesArray = (
  total: number,
  firstPageCount: number,
  otherPageCount: number,
): number[] => {
  const pages = [firstPageCount];
  let remainingItems = total - firstPageCount;

  while (remainingItems > 0) {
    pages.push(otherPageCount);
    remainingItems -= otherPageCount;
  }
  return pages;
};

//Вирахування залишку карток новин на останній сторінці
const calculateRemainingCards = (arrayItems: number[], totalItems: number): number => {
  // Вираховуємо суму всіх чисел, окрім останнього елемента
  const sum = arrayItems && arrayItems.slice(0, -1).reduce((acc, num) => acc + num, 0);

  // Віднімаємо вираховану суму від загальної кількості карток
  const remainingCards = totalItems - sum;

  return remainingCards;
};

// Розрахунок масива кількості сторінок для кожного типу пристрою
const calculatePagesForDevices = (
  total: number,
  itemsPerFirstPage: number,
  itemsPerOtherPage: number,
): number[] => {
  return calculatePagesArray(total, itemsPerFirstPage, itemsPerOtherPage);
};

//Калькуляція першого індексу новини для останніх сторінок
export const calculateFirstIndexes = (pages: number[], total: number): number | void => {
  try {
    const firstIndexes = calculateRemainingCards(pages, total);

    return firstIndexes;
  } catch (error: any) {
    return console.error(error.message);
  }
};

//Отримання кількості новин на першій сторінці для кожного пристроя
function getFirstPageCount(isLargeScreens: boolean, isTablet: boolean): number {
  switch (true) {
    case isLargeScreens:
      return COUNT.FIRST_DESKTOP_PAGE_COUNT;
    case isTablet:
      return COUNT.FIRST_TABLET_PAGE_COUNT;

    default:
      return COUNT.FIRST_MOBILE_PAGE_COUNT;
  }
}

//Отримання кількості новин на інших сторінках для кожного пристроя
function getOtherPageCount(isLargeScreens: boolean, isTablet: boolean): number {
  switch (true) {
    case isLargeScreens:
      return COUNT.OTHER_DESKTOP_PAGE_COUNT;
    case isTablet:
      return COUNT.OTHER_TABLET_PAGE_COUNT;

    default:
      return COUNT.OTHER_MOBILE_PAGE_COUNT;
  }
}
// Визначення кількості об'єктів новин на сторінці в залежності від типу пристрою
export function cardsPerPage(
  totalPages: number,
  isLargeScreens: boolean,
  isTablet: boolean,
): number[] {
  return calculatePagesForDevices(
    totalPages,
    getFirstPageCount(isLargeScreens, isTablet),
    getOtherPageCount(isLargeScreens, isTablet),
  );
}

// Рендерінг відповідних кнопок для різних сторінок пагінації та різних значень ширини девайсів
export const renderPagination = (
  currentPage: number,
  pageNumbers: number[],
  isNotMobile: boolean | undefined,
  renderPaginationButton: (pageNumber: number) => JSX.Element,
  renderEllipsis: (direction: string) => JSX.Element,
) => {
  const totalPages = pageNumbers.length;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const visibleButtonsCount = !isNotMobile
    ? QUANTITY.DESKTOP_BUTTONS_QUANTITY
    : QUANTITY.MOBILE_BUTTONS_QUANTITY;

  const paginationButtons = [];

  if (totalPages <= visibleButtonsCount) {
    for (let i = FIRST_PAGE; i <= totalPages; i += 1) {
      paginationButtons.push(renderPaginationButton(i));
    }
  } else if (currentPage === FIRST_PAGE) {
    paginationButtons.push(renderPaginationButton(currentPage));
    paginationButtons.push(renderPaginationButton(nextPage));
    paginationButtons.push(renderEllipsis('next'));
    paginationButtons.push(renderPaginationButton(totalPages));
  } else if (currentPage === totalPages) {
    paginationButtons.push(renderPaginationButton(FIRST_PAGE));
    paginationButtons.push(renderEllipsis('prev'));
    paginationButtons.push(renderPaginationButton(prevPage));
    paginationButtons.push(renderPaginationButton(currentPage));
  } else if (currentPage > FIRST_PAGE && currentPage < totalPages) {
    if (currentPage === 2) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(nextPage));
      paginationButtons.push(renderEllipsis('next'));
      paginationButtons.push(renderPaginationButton(totalPages));
    }
    if (currentPage - 1 > FIRST_PAGE && currentPage + 1 !== totalPages) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(prevPage));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(nextPage));
      paginationButtons.push(renderEllipsis('next'));
    }
    if (currentPage + 1 === totalPages) {
      paginationButtons.push(renderEllipsis('prev'));
      paginationButtons.push(renderPaginationButton(prevPage));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(totalPages));
    }
  }

  return paginationButtons;
};
