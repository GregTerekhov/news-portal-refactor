import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { VariantSwitcher } from 'types';
import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { NewsFilterManager } from 'components';
import { ThemeSwitcher } from 'ui';

import { Hero, PageScrollController } from './subcomponents';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Container from './Container';

const Layout: FC = () => {
  const { isNotMobile } = useWindowWidthContext();

  const { fetchCategoriesList, errorAPI } = useNewsAPIRedux();
  const { isAuthenticated } = useAuthRedux();
  const { allFavourites, allReads, allArchive, isLoadingDBData } = useDBRedux();

  const activeLinks = useActiveLinks();
  const { rebuiltNews } = useChooseRenderingNews(activeLinks);

  const {
    isAboutUs,
    isAccountPage,
    isArchiveActive,
    isErrorPage,
    isFavoriteActive,
    isHomeActive,
    isManageAccountPage,
    isReadActive,
    isServerErrorPage,
  } = activeLinks;

  useEffect(() => {
    if (isAuthenticated && isHomeActive) {
      fetchCategoriesList();
    }
  }, [isAuthenticated, fetchCategoriesList, isHomeActive]);

  const is429ErrorAPI = errorAPI?.toString().includes('429');

  const shouldShowPageScrollController =
    (isHomeActive && isNotMobile && rebuiltNews?.length > 0) ||
    (isArchiveActive && isNotMobile && rebuiltNews?.length > 0);

  const isAccountPages = isAccountPage || isManageAccountPage;
  const shouldNotShowFiltersManager =
    isAccountPages ||
    isAboutUs ||
    isArchiveActive ||
    (isFavoriteActive && allFavourites?.length === 0) ||
    (isReadActive && allReads?.length === 0) ||
    isErrorPage ||
    (isHomeActive && is429ErrorAPI);

  const screenShow =
    isServerErrorPage ||
    isAccountPages ||
    (isFavoriteActive && allFavourites?.length === 0) ||
    (isFavoriteActive && isLoadingDBData) ||
    (isArchiveActive && isLoadingDBData) ||
    isReadActive ||
    (isArchiveActive && allArchive?.length === 0)
      ? 'h-screen'
      : 'h-full';

  const hasLargeSection = () =>
    isArchiveActive || isFavoriteActive || isReadActive || (isHomeActive && is429ErrorAPI);

  return (
    <div
      className={`flex max-h-sectionSmall
        flex-col justify-between md:max-h-sectionMedium lg:max-h-sectionLarge hg:max-h-sectionHuge ${screenShow}`}
    >
      {!isErrorPage && <Header />}
      <main>
        {isHomeActive && <Hero />}
        <section
          className={`w-full bg-whiteBase pb-[60px] transition-colors duration-500 dark:bg-darkBackground md:pb-[100px] lg:pb-[150px] ${
            hasLargeSection() ? 'pt-10 md:pt-12 lg:pt-[60px]' : 'pt-6 md:pt-7 hg:pt-[60px]'
          }`}
        >
          <Container>
            {!isNotMobile && !isErrorPage && (
              <div className='mb-10 flex justify-end'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
              </div>
            )}
            {isAuthenticated && !shouldNotShowFiltersManager ? <NewsFilterManager /> : null}
            {isErrorPage && (
              <div className='mb-10 flex justify-end'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
              </div>
            )}
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
