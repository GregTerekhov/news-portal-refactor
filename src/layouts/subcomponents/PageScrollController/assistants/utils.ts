const DOWN_MEASURE_BUTTON_VISIBILITY = 48;
const DOWN_MEASURE_BUTTON_INVISIBILITY = 112;

export const calculateButtonVisibility = (
  currentScroll: number,
  headerHeight: number,
): { topButtonVisibility: string; bottomButtonVisibility: string } => {
  const screenHeight = window.innerHeight;
  const oneAndHalfScreenHeight = screenHeight * 1.5;
  const bodyHeight = document.documentElement.scrollHeight - currentScroll;
  const isTopVisible = currentScroll > screenHeight - headerHeight;
  const isBottomHide = bodyHeight < oneAndHalfScreenHeight;
  const isTopHide = currentScroll < DOWN_MEASURE_BUTTON_INVISIBILITY;
  const isTopVisibleFrontier = currentScroll > DOWN_MEASURE_BUTTON_VISIBILITY;

  const topButtonVisibility = isTopVisible ? 'flex' : 'hidden';
  const bottomButtonVisibility =
    isBottomHide || isTopHide ? 'hidden' : isTopVisibleFrontier ? 'flex' : 'hidden';

  return { topButtonVisibility, bottomButtonVisibility };
};
