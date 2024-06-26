const FIRST_ITEM_IDX = 0;
const SECOND_ITEM_IDX = 1;

export const commonItemStyles =
  'overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard';

export const newsListStyles = (isFavoriteActive: boolean): string =>
  `${!isFavoriteActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : 'mb-0'} max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10`;

export const getNewsItemStyles = (index: number): string => {
  let itemStyles = '';

  switch (index) {
    case FIRST_ITEM_IDX:
      itemStyles = 'md:col-start-1 md:row-start-1 lg:col-start-1';
      break;
    case SECOND_ITEM_IDX:
      itemStyles = 'lg:col-start-2 lg:row-start-1';
      break;

    default:
      break;
  }
  return `${commonItemStyles} ${itemStyles} relative h-655px w-72 md:h-700px md:w-353px lg:w-395px hg:w-442px`;
};
