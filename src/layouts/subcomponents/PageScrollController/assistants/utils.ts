const DOWN_MEASURE_BUTTON_VISIBILITY = 48;
const DOWN_MEASURE_BUTTON_INVISIBILITY = 112;

enum ButtonClass {
  Hidden = 'hidden',
  Flex = 'flex',
}

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

  const topButtonVisibility = isTopVisible ? ButtonClass.Flex : ButtonClass.Hidden;

  let buttonClass: ButtonClass;

  switch (true) {
    case isBottomHide || isTopHide:
      buttonClass = ButtonClass.Hidden;
      break;
    case isTopVisibleFrontier:
      buttonClass = ButtonClass.Flex;
      break;

    default:
      buttonClass = ButtonClass.Hidden;
      break;
  }

  return { topButtonVisibility, bottomButtonVisibility: buttonClass };
};
