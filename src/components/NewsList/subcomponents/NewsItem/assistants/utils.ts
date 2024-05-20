enum ButtonLabel {
  RemoveFromFavorite = 'Remove from favorite',
  AddToFavorite = 'Add to favorite',
  Favourites = 'Favourites',
  NotInFavourites = 'Not in favourites',
  Undefined = '',
}

//Функція виведення label для VoteButton
export const getButtonLabel = (isArchiveActive: boolean, isFavourite: boolean): ButtonLabel => {
  switch (true) {
    case !isArchiveActive && isFavourite:
      return ButtonLabel.RemoveFromFavorite;
    case !isArchiveActive && !isFavourite:
      return ButtonLabel.AddToFavorite;
    case isArchiveActive && isFavourite:
      return ButtonLabel.Favourites;
    case isArchiveActive && !isFavourite:
      return ButtonLabel.NotInFavourites;

    default:
      return ButtonLabel.Undefined;
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
