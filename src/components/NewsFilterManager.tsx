import { useActiveLinks, useAdditionalRequest, useFilterNews } from 'hooks';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MATERIALS_TYPES } from 'constants';
import { SvgIcon } from 'ui';
import SearchBlock from './SearchBlock';
import Accordeon from './Accordeon';
import FiltersBlock from './FiltersBlock';

const NewsFilterManager = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const {
    categoriesForDropdown,
    showPopular,
    getNewsByCategory,
    getNewsByPeriod,
    handleResetRequests,
  } = useAdditionalRequest();

  const {
    filters,
    handleChangeFilter,
    handleMaterialTypeChange,
    handleFiltration,
    handleSort,
    handleReset,
  } = useFilterNews({ activeLinks, setShowDropdown });

  const handleOpenManager = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='w-full'>
      <button
        className={`flex items-center gap-2 w-full py-1.5 px-6 flex justify-end text-darkBase dark:text-whiteBase font-medium text-medium md:text-2xl`}
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
              <Accordeon position='filtersBlock' filtersBlock='Additional requests'>
                <SearchBlock
                  showPopularNews={showPopular}
                  categoriesList={categoriesForDropdown}
                  getNewsByCategory={(section: string) => getNewsByCategory(section)}
                  getNewsByPeriod={(period: string) => getNewsByPeriod(period)}
                  handleResetRequests={handleResetRequests}
                />
              </Accordeon>
              <Accordeon position='filtersBlock' filtersBlock='Filtering news'>
                <FiltersBlock
                  filters={filters}
                  materialTypes={MATERIALS_TYPES}
                  handleChangeFilter={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeFilter(event)
                  }
                  handleChangeType={handleMaterialTypeChange}
                  handleFiltration={handleFiltration}
                  handleSort={handleSort}
                  handleResetFilters={handleReset}
                />
              </Accordeon>
            </>
          ) : (
            <Accordeon position='filtersBlock' filtersBlock='Filtering news'>
              <FiltersBlock
                filters={filters}
                materialTypes={MATERIALS_TYPES}
                handleChangeFilter={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeFilter(event)
                }
                handleChangeType={handleMaterialTypeChange}
                handleFiltration={handleFiltration}
                handleSort={handleSort}
                handleResetFilters={handleReset}
              />
            </Accordeon>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFilterManager;
