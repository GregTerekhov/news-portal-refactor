import React, { FC, useState } from 'react';

import { useDBRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

import { Accordeon, SvgIcon } from 'ui';

import { FiltersBlock, SearchBlock } from './subcomponents';

const NewsFilterManager: FC<{}> = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { allFavourites, allReads, allArchive } = useDBRedux();

  const { isHomeActive, isArchiveActive, isReadActive, isFavoriteActive } = useActiveLinks();

  const noFavourites: boolean = isFavoriteActive && allFavourites && allFavourites?.length === 0;
  const noReads: boolean = isReadActive && allReads && allReads?.length === 0;
  const noArchives: boolean = isArchiveActive && allArchive && allArchive?.length === 0;

  const shouldNotShowFilters: boolean = noFavourites || noReads || noArchives;

  return !shouldNotShowFilters ? (
    <div className='mb-10 w-full md:mb-12 lg:mb-[60px]'>
      <button
        id='Open filter service button'
        className='flex w-full items-center justify-end gap-2 px-6 py-1.5 text-medium font-medium text-darkBase dark:text-whiteBase md:text-2xl hg:text-3xl'
        type='button'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        News filter service
        <SvgIcon
          svgName='arrow'
          sizeKey='smIcon18'
          className={`fill-darkBase dark:fill-whiteBase ${
            showDropdown ? 'rotate-180' : 'rotate-0'
          } transition-transform`}
        />
      </button>
      {showDropdown && (
        <div className={`${showDropdown ? 'animate-accordion-down' : 'animate-accordion-up'}`}>
          {isHomeActive ? (
            <>
              <Accordeon position='filtersService' filtersBlock='Additional requests'>
                <SearchBlock />
              </Accordeon>
              <Accordeon position='filtersService' filtersBlock='Filtering news'>
                <FiltersBlock />
              </Accordeon>
            </>
          ) : (
            <Accordeon position='filtersService' filtersBlock='Filtering news'>
              <FiltersBlock />
            </Accordeon>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default NewsFilterManager;
