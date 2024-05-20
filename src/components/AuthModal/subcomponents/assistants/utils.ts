export const changeStateIsChecked = (
  event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  isChecked: boolean,
): boolean => {
  let isRememberMe = false;

  if (event.target instanceof HTMLInputElement) {
    isRememberMe = event.target.checked;
  }
  if (event.target instanceof HTMLDivElement) {
    isRememberMe = !isChecked;
  }

  return isRememberMe;
};
