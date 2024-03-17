import React, { FC } from 'react';

import { VariantInputs } from 'types';
import { useFiltersState } from 'contexts';

import { UnverifiableInput } from 'ui';

import { useChangeFilter } from '../hooks';

const FilterInputs: FC = () => {
  const { filters } = useFiltersState();
  const { handleChangeFilter } = useChangeFilter();

  const filterInputs = [
    {
      name: 'keyword',
      value: filters.keyword,
      placeholder: 'Keyword',
    },
    {
      name: 'author',
      value: filters.author,
      placeholder: 'Author',
    },
    {
      name: 'title',
      value: filters.title,
      placeholder: 'Title',
    },
    {
      name: 'publisher',
      value: filters.publisher,
      placeholder: 'Publisher',
    },
  ];
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
