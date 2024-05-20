import React, { FC } from 'react';

import { IconName, InputType } from 'types';

import { UnverifiableInput } from 'ui';

import { useChangeFilter } from '../hooks';

const FilterInputs: FC = () => {
  const { filterInputs, handleChangeFilter } = useChangeFilter();

  return (
    <>
      {Array.isArray(filterInputs) &&
        filterInputs.map(({ name, value, placeholder }) => (
          <div key={placeholder} className='md:col-span-3 lg:col-span-4'>
            <UnverifiableInput
              inputData={{
                name,
                type: InputType.Text,
                value,
                placeholder,
              }}
              svgName={IconName.Search}
              hasIcon={true}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
            />
          </div>
        ))}
    </>
  );
};

export default FilterInputs;
