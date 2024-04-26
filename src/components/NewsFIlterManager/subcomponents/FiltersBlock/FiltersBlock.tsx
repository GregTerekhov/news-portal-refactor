import React, { FC } from 'react';

import { useFiltersStateContext } from 'contexts';

import { Dropdown } from 'ui';
import Calendar from '../Calendar/Calendar';
import { ControlButtons, FilterInputs } from './subcomponents';

import { materialTypes } from './assistants';
import { useChangeFilter } from './hooks';

const FiltersBlock: FC<{}> = () => {
  const { selectedMaterialType, setSelectedMaterialType } = useFiltersStateContext();

  const { handleMaterialTypeChange } = useChangeFilter();

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
      <ControlButtons />
    </form>
  );
};

export default FiltersBlock;
