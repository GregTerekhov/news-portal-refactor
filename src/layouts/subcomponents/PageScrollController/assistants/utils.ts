const DOWN_MEASURE_BUTTON_VISIBILITY = 48;
const DOWN_MEASURE_BUTTON_INVISIBILITY = 112;

type ButtonClass = 'hidden' | 'flex';

export const calculateButtonVisibility = (
  currentScroll: number,
  headerHeight: number,
): { topButtonVisibility: ButtonClass; bottomButtonVisibility: ButtonClass } => {
  const screenHeight = window.innerHeight;
  const oneAndHalfScreenHeight = screenHeight * 1.5;
  const bodyHeight = document.documentElement.scrollHeight - currentScroll;
  const isTopVisible = currentScroll > screenHeight - headerHeight;
  const isBottomHide = bodyHeight < oneAndHalfScreenHeight;
  const isTopHide = currentScroll < DOWN_MEASURE_BUTTON_INVISIBILITY;
  const isTopVisibleFrontier = currentScroll > DOWN_MEASURE_BUTTON_VISIBILITY;

  const topButtonVisibility = isTopVisible ? 'flex' : 'hidden';

  let buttonClass: ButtonClass;

  switch (true) {
    case isBottomHide || isTopHide:
      buttonClass = 'hidden';
      break;
    case isTopVisibleFrontier:
      buttonClass = 'flex';
      break;

    default:
      buttonClass = 'hidden';
      break;
  }

  return { topButtonVisibility, bottomButtonVisibility: buttonClass };
};
