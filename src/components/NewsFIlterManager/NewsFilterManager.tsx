import React, { FC, useEffect, useState } from 'react';

import { ButtonType, IconName, IconSizes, VariantsAccordion } from 'types';

import { Accordeon, SvgIcon } from 'ui';
import { FiltersBlock, SearchBlock } from './subcomponents';

import { useActiveLinks } from 'hooks';

const NewsFilterManager: FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const activeLinks = useActiveLinks();

  useEffect(() => {
    setShowDropdown(false);
  }, [activeLinks]);

  const { isHomeActive } = activeLinks;

  return (
    <div className='mb-10 w-full md:mb-12 lg:mb-[60px]'>
      <button
        id='Open filter service button'
        className='flex w-full items-center justify-end gap-2 px-6 py-1.5 text-medium font-medium text-darkBase dark:text-whiteBase md:text-2xl hg:text-3xl'
        type={ButtonType.Button}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        News filter service
        <SvgIcon
          svgName={IconName.Arrow}
          sizeKey={IconSizes.smIcon18}
          className={`fill-darkBase transition-transform dark:fill-whiteBase ${
            showDropdown ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {showDropdown && (
        <div className={`${showDropdown ? 'animate-accordion-down' : 'animate-accordion-up'}`}>
          {isHomeActive ? (
            <>
              <Accordeon position={VariantsAccordion.Filter} blockDefinition='Additional requests'>
                <SearchBlock />
              </Accordeon>
              <Accordeon position={VariantsAccordion.Filter} blockDefinition='Filtering news'>
                <FiltersBlock />
              </Accordeon>
            </>
          ) : (
            <Accordeon position={VariantsAccordion.Filter} blockDefinition='Filtering news'>
              <FiltersBlock />
            </Accordeon>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFilterManager;
