export const getElementStyles = (isAuthenticated: boolean) => {
  let listStyles = '';
  let linkStyles = '';

  switch (true) {
    case isAuthenticated:
      listStyles = 'grid grid-rows-2 gap-3 max-md:grid-cols-3 md:grid-cols-6 md:grid-rows-1';
      linkStyles = 'hocus:underline';
      break;
    case !isAuthenticated:
      listStyles = 'flex items-center justify-between';
      linkStyles =
        'block w-24 rounded-xl border border-solid border-whiteBase text-center transition-colors duration-500 hocus:bg-accentAlt lg:w-32';
      break;

    default:
      break;
  }
  return { listStyles, linkStyles };
};
