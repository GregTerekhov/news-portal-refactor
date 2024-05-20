import React, { FC } from 'react';

import { CalendarVariant, DropdownType } from 'types';

import { materials } from 'constants/dropdownArrays';
import { useFiltersStateContext } from 'contexts';

import { Dropdown } from 'ui';
import Calendar from '../Calendar/Calendar';
import { ControlButtons, FilterInputs } from './subcomponents';

import { useChangeFilter } from './hooks';

const FiltersBlock: FC = () => {
  const { selectedMaterialType, setSelectedMaterialType } = useFiltersStateContext();

  const { handleChangeMaterialType } = useChangeFilter();

  return (
    <form className='p-3.5 max-md:space-y-4 md:grid md:grid-cols-9 md:grid-rows-3 md:gap-3.5 lg:grid-cols-16 lg:grid-rows-2'>
      <FilterInputs />
      <div className='md:col-span-3 lg:col-span-4'>
        <Dropdown
          options={materials}
          getResults={handleChangeMaterialType}
          selectedItem={selectedMaterialType}
          onSelectItem={setSelectedMaterialType}
          label={DropdownType.Type}
        ></Dropdown>
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Calendar variant={CalendarVariant.Filter} />
      </div>
      <ControlButtons />
    </form>
  );
};

export default FiltersBlock;
