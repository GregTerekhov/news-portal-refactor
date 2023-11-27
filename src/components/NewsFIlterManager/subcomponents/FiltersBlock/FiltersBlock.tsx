import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks } from 'hooks';

import { Dropdown } from 'ui';

import Calendar from '../Calendar/Calendar';
import { ControlButtons, FilterInputs } from './subcomponents';

import { materialTypes } from './assistants';
import { useFilterNews } from './hooks';

const FiltersBlock: FC<{}> = () => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { handleMaterialTypeChange } = useFilterNews({ activeLinks });

  return (
    <form className='p-3.5 max-md:space-y-4 md:grid md:grid-cols-9 md:grid-rows-3 md:gap-3.5 lg:grid-cols-16 lg:grid-rows-2'>
      <FilterInputs />
      <div className='md:col-span-3 lg:col-span-4'>
        <Dropdown labels={materialTypes} getResults={handleMaterialTypeChange}>
          Type
        </Dropdown>
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        <Calendar variant='FiltersBlock' />
      </div>
      <ControlButtons />
    </form>
  );
};

export default FiltersBlock;
