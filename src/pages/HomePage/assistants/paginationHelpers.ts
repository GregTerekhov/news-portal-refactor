import { PaginationDots } from 'types';
import { COUNT, FIRST_PAGE, QUANTITY } from './constants';

const {
  FIRST_DESKTOP_PAGE_COUNT,
  FIRST_MOBILE_PAGE_COUNT,
  FIRST_TABLET_PAGE_COUNT,
  OTHER_DESKTOP_PAGE_COUNT,
  OTHER_MOBILE_PAGE_COUNT,
  OTHER_TABLET_PAGE_COUNT,
} = COUNT;
const { DESKTOP_BUTTONS_QUANTITY, MOBILE_BUTTONS_QUANTITY } = QUANTITY;

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
  return totalItems - sum;
};

// Розрахунок масива кількості сторінок для кожного типу пристрою
const calculatePagesForDevices = (
  total: number,
  itemsPerFirstPage: number,
  itemsPerOtherPage: number,
): number[] => {
  return calculatePagesArray(total, itemsPerFirstPage, itemsPerOtherPage);
};

//Отримання кількості новин на першій сторінці для кожного пристроя
function getFirstPageCount(isMobile: boolean, isTablet: boolean): number {
  switch (true) {
    case isMobile:
      return FIRST_MOBILE_PAGE_COUNT;
    case isTablet:
      return FIRST_TABLET_PAGE_COUNT;

    default:
      return FIRST_DESKTOP_PAGE_COUNT;
  }
}

//Отримання кількості новин на інших сторінках для кожного пристроя
function getOtherPageCount(isMobile: boolean, isTablet: boolean): number {
  switch (true) {
    case isMobile:
      return OTHER_MOBILE_PAGE_COUNT;
    case isTablet:
      return OTHER_TABLET_PAGE_COUNT;

    default:
      return OTHER_DESKTOP_PAGE_COUNT;
  }
}

//Калькуляція першого індексу новини для останніх сторінок
export const calculateFirstIndexes = (pages: number[], total: number): number => {
  return calculateRemainingCards(pages, total);
};

// Визначення кількості об'єктів новин на сторінці в залежності від типу пристрою
export function cardsPerPage(totalPages: number, isMobile: boolean, isTablet: boolean): number[] {
  return calculatePagesForDevices(
    totalPages,
    getFirstPageCount(isMobile, isTablet),
    getOtherPageCount(isMobile, isTablet),
  );
}

// Рендерінг відповідних кнопок для різних сторінок пагінації та різних значень ширини девайсів
export const renderPagination = (
  currentPage: number,
  pageNumbers: number[],
  isNotMobile: boolean | undefined,
  renderPaginationButton: (pageNumber: number) => JSX.Element,
  renderEllipsis: (direction: PaginationDots) => JSX.Element,
) => {
  const lastPage = pageNumbers.length;
  const prevPage = currentPage - FIRST_PAGE;
  const nextPage = currentPage + FIRST_PAGE;
  const visibleButtonsCount = !isNotMobile ? DESKTOP_BUTTONS_QUANTITY : MOBILE_BUTTONS_QUANTITY;

  const isFirstPage = currentPage === FIRST_PAGE;
  const isLastPage = currentPage === lastPage;
  const isPenultimatePage = currentPage + FIRST_PAGE === lastPage;
  const isRemainingPages =
    currentPage - FIRST_PAGE > FIRST_PAGE && currentPage + FIRST_PAGE !== lastPage;
  const isMiddlePageInRange = currentPage > FIRST_PAGE && currentPage < lastPage;

  const paginationButtons: JSX.Element[] = [];

  if (lastPage <= visibleButtonsCount) {
    for (let i = FIRST_PAGE; i <= lastPage; i += 1) {
      paginationButtons.push(renderPaginationButton(i));
    }
  } else if (isFirstPage) {
    paginationButtons.push(renderPaginationButton(currentPage));
    paginationButtons.push(renderPaginationButton(nextPage));
    paginationButtons.push(renderEllipsis(PaginationDots.Next));
    paginationButtons.push(renderPaginationButton(lastPage));
  } else if (isLastPage) {
    paginationButtons.push(renderPaginationButton(FIRST_PAGE));
    paginationButtons.push(renderEllipsis(PaginationDots.Previous));
    paginationButtons.push(renderPaginationButton(prevPage));
    paginationButtons.push(renderPaginationButton(currentPage));
  } else if (isMiddlePageInRange) {
    if (currentPage === 2) {
      paginationButtons.push(renderEllipsis(PaginationDots.Previous));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(nextPage));
      paginationButtons.push(renderEllipsis(PaginationDots.Next));
      paginationButtons.push(renderPaginationButton(lastPage));
    }
    if (isRemainingPages) {
      paginationButtons.push(renderEllipsis(PaginationDots.Previous));
      paginationButtons.push(renderPaginationButton(prevPage));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(nextPage));
      paginationButtons.push(renderEllipsis(PaginationDots.Next));
    }
    if (isPenultimatePage) {
      paginationButtons.push(renderEllipsis(PaginationDots.Previous));
      paginationButtons.push(renderPaginationButton(prevPage));
      paginationButtons.push(renderPaginationButton(currentPage));
      paginationButtons.push(renderPaginationButton(lastPage));
    }
  }

  return paginationButtons;
};
