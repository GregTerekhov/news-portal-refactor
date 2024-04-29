import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { VariantSwitcher } from 'types';
import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsFilterManager } from 'components';
import { ThemeSwitcher } from 'ui';
import { Hero, Header, Footer, PageScrollController, Container } from './subcomponents';

const Layout: FC = () => {
  const { isNotMobile } = useWindowWidthContext();

  const { fetchCategoriesList, errorAPI } = useNewsAPIRedux();
  const { isAuthenticated } = useAuthRedux();
  const { allFavourites, allReads, isLoadingDBData } = useDBRedux();

  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);

  const {
    isAboutUs,
    isArchiveActive,
    isErrorPage,
    isFavoriteActive,
    isHomeActive,
    isReadActive,
    isDevelopmentActive,
  } = activeLinks;

  useEffect(() => {
    if (isAuthenticated && isHomeActive) {
      fetchCategoriesList();
    }
  }, [isAuthenticated, fetchCategoriesList, isHomeActive]);

  // const is429ErrorAPI = errorAPI && errorAPI === 429;
  const is429ErrorAPI = errorAPI?.toString().includes('429') ?? false;

  const shouldShowPageScrollController =
    (isNotMobile && isHomeActive && rebuiltNews?.length > 0) ||
    (isNotMobile && isFavoriteActive && allFavourites?.length >= 8);

  const shouldShowFilterManager = (): boolean =>
    (isHomeActive && !is429ErrorAPI) ||
    (isFavoriteActive && !!allFavourites?.length) ||
    (isReadActive && !!allReads?.length);

  const isFullHeightSection = (): boolean =>
    isHomeActive ||
    (isFavoriteActive && !!allFavourites?.length) ||
    (isFavoriteActive && !isLoadingDBData) ||
    isAboutUs ||
    isErrorPage;

  const shouldRenderLargeSection = (): boolean =>
    isArchiveActive ||
    isFavoriteActive ||
    isReadActive ||
    isDevelopmentActive ||
    (isHomeActive && !!is429ErrorAPI);

  const sectionStyles = `relative w-full bg-whiteBase pb-[60px] transition-colors duration-500 dark:bg-darkBackground md:pb-[100px] lg:pb-[150px] ${
    shouldRenderLargeSection() ? 'pt-10 md:pt-12 lg:pt-[60px]' : 'pt-6 md:pt-7 hg:pt-[60px]'
  }`;

  return (
    <div
      className={`flex max-h-sectionSmall
        flex-col justify-between md:max-h-sectionMedium lg:max-h-sectionLarge hg:max-h-sectionHuge ${
          isFullHeightSection() ? 'h-full' : 'h-screen'
        }`}
    >
      {!isErrorPage && <Header />}
      <main>
        {isHomeActive && <Hero />}
        <section className={sectionStyles}>
          <Container className='relative'>
            {(!isNotMobile && !isErrorPage) || isErrorPage ? (
              <div className='mb-10 flex justify-end'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
              </div>
            ) : null}
            {isAuthenticated && shouldShowFilterManager() ? <NewsFilterManager /> : null}
            {shouldShowPageScrollController ? (
              <>
                <PageScrollController
                  direction='top'
                  label='Scroll up'
                  position='top-36'
                  icon='triangle'
                />
                <PageScrollController
                  direction='down'
                  label='Scroll down'
                  position='bottom-12'
                  icon='triangle'
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
