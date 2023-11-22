import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks, useNewsDBCollector } from 'hooks';

import { Accordeon, SvgIcon } from 'ui';

import { FiltersBlock, SearchBlock } from './subcomponents';

const NewsFilterManager: FC<{}> = () => {
  const { allFavourites, allReads } = useNewsDBCollector();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const handleOpenManager = () => {
    setShowDropdown(!showDropdown);
  };

  const shouldNotShowFilters =
    (activeLinks.isFavoriteActive && allFavourites && allFavourites?.length === 0) ||
    (activeLinks.isReadActive && allReads && allReads?.length === 0);

  return (
    <div className={`w-full ${shouldNotShowFilters && 'hidden'}`}>
      <button
        id='Open filter service button'
        className={`flex items-center gap-2 w-full py-1.5 px-6 justify-end text-darkBase dark:text-whiteBase font-medium text-medium md:text-2xl`}
        type='button'
        onClick={handleOpenManager}
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
          {activeLinks.isHomeActive ? (
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
  );
};

export default NewsFilterManager;
