import React, { useMemo, useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import Calendar from './Calendar';
import { useLocation } from 'react-router-dom';
import { MATERIALS_TYPES } from 'constants';
import { useWindowWidth } from 'hooks';

const FiltersBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const location = useLocation();

  const activeLinks = useMemo(
    () => ({
      isHomeActive: location.pathname === '/',
      isFavoriteActive: location.pathname === '/favourite',
      isReadActive: location.pathname === '/read',
    }),
    [location.pathname],
  );

  const onClick: any = () => {
    setShowDropdown(!showDropdown);
  };

  const borderRadius = showDropdown ? 'rounded-t-xl' : 'rounded-xl';

  return (
    <div className={`${activeLinks.isHomeActive ? 'w-1/2' : 'mb-10'}`}>
      <button
        className={`flex items-center gap-2 bg-accentBase ${borderRadius} w-full py-1.5 px-6 flex justify-end text-whiteBase font-medium text-medium md:text-2xl`}
        type='button'
        onClick={onClick}
      >
        Filters
        <SvgIcon
          svgName={showDropdown ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={15}
          className='fill-whiteBase'
        />
      </button>
      {showDropdown && (
        <form className='grid grid-cols-4 grid-rows-4 gap-3.5 md:gap-y-1.5 lg:grid-cols-3 lg:grid-rows-3 lg:gap-3.5 bg-accentLightForeground transition-colors p-3.5 rounded-b-xl'>
          <Input
            inputData={{ name: 'keyword', type: 'text', placeholder: 'Keyword' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-2'
          />
          <Input
            inputData={{ name: 'author', type: 'text', placeholder: 'Author' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-2'
          />
          <Input
            inputData={{ name: 'title', type: 'text', placeholder: 'Title' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-2'
          />
          <Input
            inputData={{ name: 'publisher', type: 'text', placeholder: 'Publisher' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-2'
          />
          <div className='col-span-3'>
            <Dropdown labels={MATERIALS_TYPES}>Type</Dropdown>
          </div>

          <div
            className={`${
              breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 'w-16' : ''
            }`}
          >
            <PrimaryButton
              buttonData={{ type: 'reset' }}
              hasIcon={true}
              variant='SearchBlock'
              svgName='icon-reset'
              svgSize={16}
              className='fill-whiteBase'
            >
              {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? null : 'Reset'}
            </PrimaryButton>
          </div>
          {activeLinks.isReadActive ? null : <Calendar />}
          <div className='col-span-4'>
            <PrimaryButton buttonData={{ type: 'submit' }} variant='SearchBlock'>
              Submit
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default FiltersBlock;
