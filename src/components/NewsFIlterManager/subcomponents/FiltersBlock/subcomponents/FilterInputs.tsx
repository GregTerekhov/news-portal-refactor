import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks } from 'hooks';

import { UnverifiableInput } from 'ui';

import { useFilterNews } from '../hooks';

const FilterInputs: FC = () => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { filters, handleChangeFilter } = useFilterNews({
    activeLinks,
  });

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
              svgName='icon-search'
              hasIcon={true}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter(event)}
              variant='filterServiceBlock'
            />
          </div>
        ))}
    </>
  );
};

export default FilterInputs;
