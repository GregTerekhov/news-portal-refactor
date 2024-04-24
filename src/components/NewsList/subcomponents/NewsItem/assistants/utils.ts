import type { VotedItem } from 'types';

type ButtonLabel =
  | 'Remove from favorite'
  | 'Add to favorite'
  | 'Favourited'
  | 'Not in favourites'
  | undefined;

//Функція виведення label для VoteButton
export const getButtonLabel = (isArchiveActive: boolean, isFavourite: boolean): ButtonLabel => {
  switch (true) {
    case !isArchiveActive && isFavourite:
      return 'Remove from favorite';
    case !isArchiveActive && !isFavourite:
      return 'Add to favorite';
    case isArchiveActive && isFavourite:
      return 'Favourited';
    case isArchiveActive && !isFavourite:
      return 'Not in favourites';

    default:
      return;
  }
};

//Функція визначення стиля для іконки фаворитів
export const getIconStyles = (
  isFavourite: boolean,
  isHovered: boolean,
  isArchiveActive: boolean,
): string => {
  switch (true) {
    case !isArchiveActive && isFavourite && isHovered:
      return 'group-hover:fill-whiteBase group-hover:stroke-whiteBase group-focus:stroke-whiteBase';
    case !isArchiveActive && isFavourite && !isHovered:
      return 'fill-accentBase stroke-accentBase';
    case !isArchiveActive && !isFavourite && isHovered:
      return 'group-hover:fill-accentBase group-hover:stroke-whiteBase group-focus:stroke-whiteBase';
    case isArchiveActive && !isFavourite:
      return 'fill-none stroke-accentBase';
    case isArchiveActive && isFavourite:
      return 'fill-accentBase stroke-accentBase';

    default:
      return 'fill-none stroke-accentBase';
  }
};

const clickDate = new Date().getTime();

export const createUpdatedFavouritesObject = (
  liveNews: Partial<VotedItem>,
  savedFavourite: boolean | undefined,
  savedRead: boolean | undefined,
  savedClickDate: number | null | undefined,
): Partial<VotedItem> | undefined => {
  switch (true) {
    case !savedFavourite && savedRead:
      return {
        ...liveNews,
        isFavourite: !savedFavourite,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
    case savedFavourite && !savedRead:
      return {
        ...liveNews,
        isFavourite: !savedFavourite,
        additionDate: null,
      };
    case savedFavourite && savedRead:
      return {
        ...liveNews,
        isFavourite: !savedFavourite,
        hasRead: savedRead,
        additionDate: savedClickDate,
      };
    case !savedFavourite && !savedRead:
      return {
        ...liveNews,
        isFavourite: !savedFavourite,
        additionDate: clickDate,
      };

    default:
      return;
  }
};

export const createUpdatedReadObject = (
  liveNews: Partial<VotedItem>,
  savedFavourite: boolean | undefined,
  savedRead: boolean | undefined,
  savedClickDate: number | null | undefined,
): Partial<VotedItem> | undefined => {
  switch (true) {
    case !savedFavourite && !savedRead:
      return {
        ...liveNews,
        hasRead: true,
        additionDate: clickDate,
      };
    case savedFavourite && !savedRead:
      return {
        ...liveNews,
        isFavourite: savedFavourite,
        hasRead: true,
        additionDate: savedClickDate,
      };
    case savedFavourite && savedRead:
      return;

    default:
      return;
  }
};
