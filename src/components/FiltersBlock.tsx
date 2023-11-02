import React, { useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import Calendar from './Calendar';
import { useLocation } from 'react-router-dom';
import { MATERIALS_TYPES } from 'constants';
import { useActiveLinks, useWindowWidth } from 'hooks';
import applyCrossFilters from 'helpers/applyCrossFilters';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectByCategory, selectPopular, selectSearchByKeyword } from 'redux/newsAPI';
import { filterNews } from 'redux/filterSlice';
import { rebuildNewsArray } from 'helpers';
import { PartialVotedNewsArray } from 'types/news';
import { selectAllFavourites, selectAllReads } from 'redux/newsDatabase';

type Filters = {
  keyword: string;
  title: string;
  author: string;
  publisher: string;
  materialType: string;
};

const FiltersBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    title: '',
    author: '',
    publisher: '',
    materialType: '',
  });

  const popularData = useAppSelector(selectPopular);
  const searchResults = useAppSelector(selectSearchByKeyword);
  const searchByCategory = useAppSelector(selectByCategory);
  const favourites = useAppSelector(selectAllFavourites);
  const reads = useAppSelector(selectAllReads);

  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleMaterialTypeChange = (selectedType: string) => {
    setFilters({
      ...filters,
      materialType: selectedType,
    });
  };

  const chooseRenderingNews = () => {
    if (searchResults && searchResults?.length > 0 && activeLinks.isHomeActive) {
      const rebuildedNews = rebuildNewsArray(searchResults);

      return rebuildedNews || [];
    } else if (searchByCategory && searchByCategory?.length > 0 && activeLinks.isHomeActive) {
      const rebuildedNews = rebuildNewsArray(searchByCategory);

      return rebuildedNews || [];
    } else if (popularData && popularData?.length > 0 && activeLinks.isHomeActive) {
      const rebuildedNews = rebuildNewsArray(popularData);

      return rebuildedNews || [];
    } else if (favourites && favourites?.length > 0 && activeLinks.isFavoriteActive) {
      return favourites;
    } else if (reads && reads?.length > 0 && activeLinks.isReadActive) {
      return reads;
    }
  };

  const rebuildedNews = chooseRenderingNews();

  const handleFiltration = (event: React.FormEvent) => {
    event.preventDefault();

    if (rebuildedNews && rebuildedNews.length > 0) {
      const filteredNews = applyCrossFilters(rebuildedNews, filters);

      if (filteredNews) {
        dispatch(filterNews(filteredNews));
      }
    } else {
      const defaultFilteredNews: PartialVotedNewsArray = [];
      dispatch(filterNews(defaultFilteredNews));
    }
    setFilters({
      keyword: '',
      title: '',
      author: '',
      publisher: '',
      materialType: '',
    });

    setShowDropdown(false);
  };

  const handleSort = (order: string) => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      const sortedNews = [...rebuildedNews];

      sortedNews.sort((a, b) => {
        const formatDate = (dateStr: string | undefined) => {
          if (dateStr) {
            const [day, month, year] = dateStr.split('/').map(Number);
            return new Date(year, month - 1, day).getTime();
          }
          return 0;
        };
        const dateA = formatDate(a.publishDate);
        const dateB = formatDate(b.publishDate);

        if (order === 'asc') {
          return dateA - dateB;
        } else if (order === 'desc') {
          return dateB - dateA;
        }

        return 0;
      });
      dispatch(filterNews(sortedNews));
    }
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      title: '',
      author: '',
      publisher: '',
      materialType: '',
    });
  };

  const borderRadius = showDropdown ? 'rounded-t-xl' : 'rounded-xl';

  return (
    <div className={`w-full ${!activeLinks.isHomeActive ? 'mb-10 md:w-1/2' : ''}`}>
      <button
        className={`flex items-center gap-2 bg-accentBase ${borderRadius} w-full py-1.5 px-6 flex justify-end text-whiteBase font-medium text-medium md:text-2xl`}
        type='button'
        onClick={handleToggleDropdown}
      >
        Filters
        <SvgIcon
          svgName={showDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={15}
          className='fill-whiteBase'
        />
      </button>
      {showDropdown && (
        <form
          className={`grid max-lg:grid-cols-6 ${
            activeLinks.isReadActive
              ? 'max-lg:grid-rows-4 lg:grid-cols-9'
              : 'max-lg:grid-rows-5 lg:grid-cols-10'
          } gap-3.5 md:gap-5 lg:grid-rows-3 bg-accentLightForeground transition-colors p-3.5 rounded-b-xl`}
        >
          <Input
            inputData={{
              name: 'keyword',
              type: 'text',
              value: filters.keyword,
              placeholder: 'Keyword',
            }}
            hasIcon={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
          />
          <Input
            inputData={{
              name: 'author',
              type: 'text',
              value: filters.author,
              placeholder: 'Author',
            }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
          />
          <Input
            inputData={{
              name: 'title',
              type: 'text',
              value: filters.title,
              placeholder: 'Title',
            }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
          />
          {!activeLinks.isReadActive && breakpointsForMarkup?.isDesktop && (
            <div className='flex justify-center md:justify-center lg:col-start-10'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
                onClick={() => handleSort('asc')}
              >
                <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          <Input
            inputData={{
              name: 'publisher',
              type: 'text',
              value: filters.publisher,
              placeholder: 'Publisher',
            }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
          />
          {!activeLinks.isReadActive && (
            <div className={`${breakpointsForMarkup?.isDesktop ? 'col-span-3' : 'col-span-5'}`}>
              <Dropdown labels={MATERIALS_TYPES} getResults={handleMaterialTypeChange}>
                Type
              </Dropdown>
            </div>
          )}
          {activeLinks.isReadActive && (
            <>
              <div className='col-span-3'>
                <Dropdown labels={MATERIALS_TYPES} getResults={handleMaterialTypeChange}>
                  Type
                </Dropdown>
              </div>
              <div className='flex items-center justify-end'>
                <span className='text-contrastWhite'>Sort:</span>
              </div>
              <div className='flex justify-center md:justify-center lg:col-start-8'>
                <button
                  type='button'
                  className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
                  onClick={() => handleSort('asc')}
                >
                  <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
                </button>
              </div>
              <div className='flex justify-center md:justify-center lg:col-start-9'>
                <button
                  type='button'
                  className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
                  onClick={() => handleSort('desc')}
                >
                  <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
                </button>
              </div>
            </>
          )}
          {!activeLinks.isReadActive && !breakpointsForMarkup?.isDesktop && (
            <div className='flex justify-center md:justify-center'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
                onClick={() => handleSort('asc')}
              >
                <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          {breakpointsForMarkup?.isDesktop && !activeLinks.isReadActive ? (
            <div className='lg:col-span-3'>
              <Calendar />
            </div>
          ) : null}

          {!breakpointsForMarkup?.isDesktop && !activeLinks.isReadActive ? (
            <div className='col-span-5'>
              <Calendar />
            </div>
          ) : null}
          {!activeLinks.isReadActive && (
            <div className='flex justify-center md:justify-center'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
                onClick={() => handleSort('desc')}
              >
                <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          <div
            className={`col-span-5 ${activeLinks.isReadActive ? 'lg:col-span-7' : 'lg:col-span-8'}`}
          >
            <PrimaryButton
              buttonData={{ type: 'submit' }}
              variant='SearchBlock'
              onHandleClick={handleFiltration}
            >
              Submit
            </PrimaryButton>
          </div>

          {breakpointsForMarkup?.isDesktop ? (
            <div className='col-span-2'>
              <PrimaryButton
                buttonData={{ type: 'reset' }}
                hasIcon={true}
                variant='SearchBlock'
                svgName='icon-reset'
                svgSize={16}
                className='fill-whiteBase'
                onHandleClick={handleReset}
              >
                Reset
              </PrimaryButton>
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <button
                type='button'
                className='p-3 bg-accentBase hover:bg-accentAlt transition-colors rounded-[10px]'
                onClick={handleReset}
              >
                <SvgIcon svgName='icon-reset' size={16} className='fill-whiteBase' />
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default FiltersBlock;
