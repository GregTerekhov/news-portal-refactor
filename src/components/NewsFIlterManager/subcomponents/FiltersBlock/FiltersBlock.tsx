import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Filters } from 'types';
import { useFiltersState } from 'contexts';
import { useActiveLinks, useFilterNews } from 'hooks';

import { Dropdown } from 'ui';

import { materialTypes } from './assistants';
import Calendar from '../Calendar/Calendar';
import { ControlButtons, FilterInputs } from './subcomponents';

const FiltersBlock: FC<{}> = () => {
  const [selectedMaterialType, setSelectedMaterialType] = useState<string>('');

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { handleMaterialTypeChange } = useFilterNews({ activeLinks, setSelectedMaterialType });
  const { filters } = useFiltersState();

  const hasNonEmptyValue = (filtersObject: Filters): boolean => {
    return Object.values(filtersObject).some((value) => {
      if (typeof value === 'object' && value !== null) {
        return hasNonEmptyValue(value);
      }
      return value !== '';
    });
  };

  const hasFilterValue: boolean = hasNonEmptyValue(filters);

  return (
    <form className='p-3.5 max-md:space-y-4 md:grid md:grid-cols-9 md:grid-rows-3 md:gap-3.5 lg:grid-cols-16 lg:grid-rows-2'>
      <FilterInputs />
      <div className='md:col-span-3 lg:col-span-4'>
        <Dropdown
          options={materialTypes}
          getResults={handleMaterialTypeChange}
          selectedItem={selectedMaterialType}
          onSelectItem={setSelectedMaterialType}
          label='Type'
        ></Dropdown>
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Calendar variant='FiltersBlock' />
      </div>
      <ControlButtons hasFilterValue={hasFilterValue} />
    </form>
  );
};

export default FiltersBlock;
