interface IFooterMenuStyles {
  listStyles: string;
  linkStyles: string;
}

export const getElementStyles = (isAuthenticated: boolean): IFooterMenuStyles => {
  let listStyles = '';
  let linkStyles = '';

  if (isAuthenticated) {
    listStyles = 'grid grid-rows-2 gap-3 max-md:grid-cols-3 md:grid-cols-6 md:grid-rows-1';
    linkStyles = 'hocus:underline';
  } else {
    listStyles = 'flex items-center justify-between';
    linkStyles =
      'block w-24 rounded-xl border border-solid border-whiteBase text-center transition-colors duration-500 hocus:bg-accentAlt lg:w-32';
  }

  return { listStyles, linkStyles };
};
