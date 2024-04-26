import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { VariantSwitcher } from 'types';
import { useAuthRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useModalStateContext, useScrollBodyContext, useWindowWidthContext } from 'contexts';

import { useActiveLinks, useHeaderStyles } from 'hooks';

import { ThemeSwitcher } from 'ui';
import { AuthButton, AuthenticatedHeaderContent } from './subcomponents';
import Container from '../Container';

import { useProcessingParams } from './hooks';

const Header: FC<{}> = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const { isAuthenticated } = useAuthRedux();
  const { filteredNews, resetAllFiltersResults } = useFiltersRedux();
  const { isScrollDisabled, setIsScrollDisabled } = useScrollBodyContext();
  const { isNotMobile } = useWindowWidthContext();
  const { isOpenModal, setIsOpenModal } = useModalStateContext();

  const { isHomeActive } = useActiveLinks();
  const { headerClass, textClass } = useHeaderStyles(isHomeActive);
  const { passwordToken } = useProcessingParams(setIsOpenModal, setIsScrollDisabled);

  //Функція toggle для мобільного меню
  const toggleMenu = (): void => {
    setIsOpenMenu(!isOpenMenu);
    setIsScrollDisabled(!isScrollDisabled);
  };

  //Скидання значень фільтрації новин
  const resetFilters = (): void => {
    if (filteredNews?.length > 0) resetAllFiltersResults();
  };

  const headerStyles = `fixed left-0 top-0 flex min-h-81px w-full items-center justify-center md:min-h-106px lg:min-h-113px hg:min-h-136px ${
    isHomeActive
      ? headerClass
      : 'border-b border-solid border-fullDark/[.2] bg-whiteBase/[.8] dark:border-whiteBase/[.2] dark:bg-darkBackground/[.8]'
  } transition-all duration-100 ${isOpenMenu && 'border-b-0'} ${
    isOpenModal ? 'pointer-events-none z-0' : 'pointer-events-auto z-50'
  }`;

  const logoLinkStyles = `${
    isHomeActive && !isOpenMenu ? textClass : 'text-darkBase dark:text-whiteBase'
  } z-50 text-3xl font-bold leading-tight transition-colors duration-500 sm:py-6 md:pb-[30px] md:pt-8 md:text-4xl lg:py-7 lg:text-giant lg:leading-[1.357144]`;

  return (
    <header className={headerStyles}>
      <Container
        className={`${isAuthenticated ? 'gap-3.5' : ''} relative flex items-center justify-between`}
      >
        <Link to='/' className={logoLinkStyles}>
          News
        </Link>
        {isAuthenticated ? (
          <AuthenticatedHeaderContent
            resetFilters={resetFilters}
            isOpenMenu={isOpenMenu}
            toggleMenu={toggleMenu}
          />
        ) : (
          <div className={`${isNotMobile ? 'flex flex-col gap-3' : ''}`}>
            <AuthButton passwordToken={passwordToken} />
            {isNotMobile ? <ThemeSwitcher variant={VariantSwitcher.Header} /> : null}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
