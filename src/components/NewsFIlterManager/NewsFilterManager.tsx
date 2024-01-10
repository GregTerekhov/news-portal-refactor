import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useDB } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

import { Accordeon, SvgIcon } from 'ui';

import { FiltersBlock, SearchBlock } from './subcomponents';

const NewsFilterManager: FC<{}> = () => {
  const { allFavourites, allReads, allArchive } = useDB();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const location = useLocation();
  const { isHomeActive, isArchiveActive, isReadActive, isFavoriteActive } =
    useActiveLinks(location);

  const noFavourites = isFavoriteActive && allFavourites && allFavourites?.length === 0;
  const noReads = isReadActive && allReads && allReads?.length === 0;
  const noArchives = isArchiveActive && allArchive && allArchive?.length === 0;

  const shouldNotShowFilters = noFavourites || noReads || noArchives;

  return !shouldNotShowFilters ? (
    <div className='w-full mb-10 md:mb-12 lg:mb-[60px]'>
      <button
        id='Open filter service button'
        className={`flex items-center gap-2 w-full py-1.5 px-6 justify-end text-darkBase dark:text-whiteBase font-medium text-medium md:text-2xl`}
        type='button'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        News filter service
        <SvgIcon
          svgName='icon-arrow-down'
          size={15}
          className={`fill-darkBase dark:fill-whiteBase ${
            showDropdown ? 'rotate-180' : 'rotate-0'
          } transition-transform`}
        />
      </button>
      {showDropdown && (
        <div>
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
