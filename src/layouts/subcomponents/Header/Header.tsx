import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Paths, VariantSwitcher } from 'types';

import { useAuthRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useModalStateContext, useScrollBodyContext, useWindowWidthContext } from 'contexts';

import { ThemeSwitcher } from 'ui';
import { AuthButton, AuthenticatedHeaderContent } from './subcomponents';
import { Container } from '..';

import { useActiveLinks, useHeaderStyles } from 'hooks';
import { useProcessingParams } from './hooks';
import { getHeaderStyles, getLogoLinkStyles } from './assistants';

const Header: FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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

  const headerStyles = getHeaderStyles(isHomeActive, headerClass, isOpenMenu, isOpenModal);
  const logoClass = getLogoLinkStyles(isHomeActive, textClass, isOpenMenu);

  return (
    <header className={headerStyles}>
      <Container
        className={`${isAuthenticated ? 'gap-3.5' : ''} relative flex items-center justify-between`}
      >
        <Link to={Paths.Home} className={logoClass}>
          News
        </Link>
        {isAuthenticated ? (
          <AuthenticatedHeaderContent
            resetFilters={resetFilters}
            isOpenMenu={isOpenMenu}
            toggleMenu={toggleMenu}
          />
        ) : (
          <div className={isNotMobile ? 'flex flex-col gap-3' : ''}>
            <AuthButton passwordToken={passwordToken} />
            {isNotMobile ? <ThemeSwitcher variant={VariantSwitcher.Header} /> : null}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
