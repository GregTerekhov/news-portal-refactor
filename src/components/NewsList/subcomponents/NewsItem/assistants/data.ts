import type { VotedItem } from 'types';

interface ICreatedNewsObject {
  liveNews: Partial<VotedItem>;
  savedFavourite: boolean | undefined;
  savedRead: boolean | undefined;
  savedAdditionDate: number | null | undefined;
}

const clickDate = new Date().getTime();

export const createUpdatedFavouritesObject = ({
  liveNews,
  savedFavourite,
  savedRead,
  savedAdditionDate,
}: ICreatedNewsObject): Partial<VotedItem> | undefined => {
  switch (true) {
    case !savedFavourite && savedRead:
      return {
        ...liveNews,
        isFavourite: !savedFavourite,
        hasRead: savedRead,
        additionDate: savedAdditionDate,
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
        additionDate: savedAdditionDate,
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

export const createUpdatedReadObject = ({
  liveNews,
  savedFavourite,
  savedRead,
  savedAdditionDate,
}: ICreatedNewsObject): Partial<VotedItem> | undefined => {
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
        additionDate: savedAdditionDate,
      };
    case savedFavourite && savedRead:
      return;

    default:
      return;
  }
};
