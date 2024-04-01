import React, { FC } from 'react';

import { VariantInputs } from 'types';

import { UnverifiableInput } from 'ui';

import { useChangeFilter } from '../hooks';

const FilterInputs: FC = () => {
  const { filterInputs, handleChangeFilter } = useChangeFilter();

  return (
    <>
      {Array.isArray(filterInputs) &&
        filterInputs.map(({ name, value, placeholder }) => (
          <div key={name} className='md:col-span-3 lg:col-span-4'>
            <UnverifiableInput
              inputData={{
                name,
                type: 'text',
                value,
                placeholder,
              }}
              svgName='search'
              hasIcon={true}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
              variant={VariantInputs.FilterServiceBlock}
            />
          </div>
        ))}
    </>
  );
};

export default FilterInputs;
