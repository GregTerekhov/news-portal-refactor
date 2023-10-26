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
  }, [isHomePage, screenHeight]);

  const headerClass = isScrolled
    ? 'bg-foregroundLight dark:bg-foregroundDark border-b'
    : 'bg-transparent border-0';

  const textClass = isScrolled ? 'text-darkBase dark:text-whiteBase' : 'text-whiteBase';

  const inputClass = {
    inputBorder: isScrolled ? 'border-darkBase dark:border-whiteBase' : 'border-whiteBase',
    svgFill: isScrolled ? 'fill-darkBase dark:fill-whiteBase' : 'fill-whiteBase',
    caretColor: isScrolled ? 'caret-accentBase dark:caret-whiteBase' : 'caret-whiteBase',
    textColor: isScrolled ? 'text-darkBase dark:text-whiteBase' : 'text-whiteBase',
    placeholderColor: isScrolled
      ? 'placeholder:text-placeholderText dark:placeholder:text-foreground'
      : 'placeholder:text-whiteBase',
  };

  const switcherText = isScrolled ? 'text-greyBase' : 'text-whiteBase';

  return {
    headerClass,
    textClass,
    inputClass,
    switcherText,
  };
};

export default useHeaderStyles;
