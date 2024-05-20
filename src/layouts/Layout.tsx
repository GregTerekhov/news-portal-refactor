import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { DirectionScrollButton, IconName, VariantSwitcher } from 'types';

import { useAuthRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { NewsFilterManager } from 'components';
import { ThemeSwitcher } from 'ui';
import { Hero, Header, Footer, PageScrollController, Container } from './subcomponents';

import { useActiveLinks } from 'hooks';
import { useError, useLayoutContent } from './hooks';

const Layout: FC = () => {
  const { fetchCategoriesList } = useNewsAPIRedux();
  const { isAuthenticated } = useAuthRedux();

  const { isErrorPage, isHomeActive } = useActiveLinks();
  const { redirectToServerErrorPage } = useError();
  const { isFilterManager, isFullHeight, isLargeSection, isPageScrollController, isThemeSwitcher } =
    useLayoutContent();

  useEffect(() => {
    if (isAuthenticated && isHomeActive) {
      fetchCategoriesList();
    }
  }, [isAuthenticated, fetchCategoriesList, isHomeActive]);

  useEffect(() => {
    redirectToServerErrorPage();
  }, []);

  const sectionStyles = `relative w-full bg-whiteBase pb-[60px] transition-colors duration-500 dark:bg-darkBackground md:pb-[100px] lg:pb-[150px] ${
    isLargeSection ? 'pt-10 md:pt-12 lg:pt-[60px]' : 'pt-6 md:pt-7 hg:pt-[60px]'
  }`;

  return (
    <div
      className={`flex max-h-sectionSmall
        flex-col justify-between md:max-h-sectionMedium lg:max-h-sectionLarge hg:max-h-sectionHuge ${
          isFullHeight ? 'h-full' : 'h-screen'
        }`}
    >
      {!isErrorPage && <Header />}
      <main>
        {isHomeActive && <Hero />}
        <section className={sectionStyles}>
          <Container className='relative'>
            {isThemeSwitcher ? (
              <div className='mb-10 flex justify-end'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
              </div>
            ) : null}
            {isAuthenticated && isFilterManager ? <NewsFilterManager /> : null}
            {isPageScrollController ? (
              <>
                <PageScrollController
                  direction={DirectionScrollButton.Up}
                  label='Scroll up'
                  position='top-36'
                  icon={IconName.Triangle}
                />
                <PageScrollController
                  direction={DirectionScrollButton.Down}
                  label='Scroll down'
                  position='bottom-12'
                  icon={IconName.Triangle}
                  classIcon='rotate-180'
                />
              </>
            ) : null}
            <Outlet />
          </Container>
        </section>
      </main>
      {!isErrorPage && <Footer />}
    </div>
  );
};

export default Layout;
