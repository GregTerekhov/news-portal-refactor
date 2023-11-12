import { useEffect, useState } from 'react';
import { useWindowWidth } from '.';

const useHeaderStyles = (isHomePage: boolean) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const screenHeight = window.innerHeight;

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const currentScroll = window.scrollY;

        function getHeaderHeight() {
          let headerHeight: number = 81;
          switch (true) {
            case breakpointsForMarkup?.isTablet:
              headerHeight = 106;
              break;
            case breakpointsForMarkup?.isDesktop:
              headerHeight = 113;
              break;
            default:
              headerHeight = 81;
          }
          return headerHeight;
        }

        const isScrolling = currentScroll > screenHeight - getHeaderHeight();
        setIsScrolled(isScrolling);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [isHomePage, screenHeight]);

  const headerClass = isScrolled
    ? 'bg-whiteBase/[.8] dark:bg-darkBackground/[.8] border-b'
    : 'bg-transparent border-0 backdrop-blur-lg';

  const textClass = isScrolled ? 'text-darkBase dark:text-whiteBase' : 'text-whiteBase';

  const inputHomePage = {
    inputBorder: isScrolled ? 'border-darkBase dark:border-whiteBase' : 'border-whiteBase',
    svgFill: isScrolled ? 'fill-darkBase dark:fill-whiteBase' : 'fill-whiteBase',
    caretColor: isScrolled ? 'caret-accentBase dark:caret-whiteBase' : 'caret-whiteBase',
    textColor: isScrolled ? 'text-darkBase dark:text-whiteBase' : 'text-whiteBase',
    placeholderColor: isScrolled
      ? 'placeholder:text-darkBase/[.4] dark:placeholder:text-whiteBase/[.4]'
      : 'placeholder:text-whiteBase',
  };

  const inputClass = {
    inputBorder: isHomePage ? inputHomePage.inputBorder : 'border-darkBase dark:border-whiteBase',
    svgFill: isHomePage ? inputHomePage.svgFill : 'fill-darkBase dark:fill-whiteBase',
    caretColor: isHomePage ? inputHomePage.caretColor : 'caret-accentBase dark:caret-whiteBase',
    textColor: isHomePage ? inputHomePage.textColor : 'text-darkBase dark:text-whiteBase',
    placeholderColor: isHomePage
      ? inputHomePage.placeholderColor
      : 'placeholder:text-darkBase/[.4] dark:placeholder:text-whiteBase/[.4]',
  };

  const switcherTextClass = isScrolled ? 'text-greyBase' : 'text-greyBase dark:text-whiteBase';

  const burgerMenuButtonClass = isScrolled
    ? 'stroke-darkBase dark:stroke-whiteBase'
    : 'stroke-whiteBase';

  return {
    headerClass,
    textClass,
    inputClass,
    switcherTextClass,
    burgerMenuButtonClass,
  };
};

export default useHeaderStyles;
