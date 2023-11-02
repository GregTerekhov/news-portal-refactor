import React from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { FiltersBlock, Hero, PageScrollController, SearchBlock } from 'components';
import { useActiveLinks, useWindowWidth } from 'hooks';
import { useAppSelector } from 'redux/hooks';
import { selectAllFavourites, selectAllReads } from 'redux/newsDatabase';

const Layout = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const favouriteNews = useAppSelector(selectAllFavourites);
  const readNews = useAppSelector(selectAllReads);

  return (
    <>
      <Header />
      {activeLinks.isHomeActive && <Hero />}
      <section
        className={`w-full bg-whiteBase dark:bg-darkThemeBackground transition-colors duration-500 h-full ${
          activeLinks.isFavoriteActive || activeLinks.isReadActive
            ? 'pt-10 md:pt-12 lg:pt-[60px]'
            : 'pt-6 md:pt-7'
        } pb-[60px] md:pb-[100px] lg:pb-[150px]`}
      >
        <div className='container mx-auto px-4 hg:px-[65px]'>
          {activeLinks.isHomeActive ? (
            <div className='max-md:space-y-3.5 md:flex md:gap-7 mb-10 md:mb-12 lg:mb-[60px]'>
              <SearchBlock />
              <FiltersBlock />
            </div>
          ) : (
            <>
              {(activeLinks.isFavoriteActive && favouriteNews && favouriteNews.length > 0) ||
              (activeLinks.isReadActive && readNews && readNews.length > 0) ? (
                <FiltersBlock />
              ) : null}
            </>
          )}
          {(activeLinks.isHomeActive && breakpointsForMarkup?.isTablet) ||
          breakpointsForMarkup?.isDesktop ? (
            <>
              <PageScrollController direction='top' position='top-36' icon='icon-triangle-up' />
              <PageScrollController
                direction='down'
                position='bottom-12'
                icon='icon-triangle-down'
              />
            </>
          ) : null}
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Layout;
