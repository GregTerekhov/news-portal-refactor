import React, { useState } from 'react';
import { Dropdown, Input, PrimaryButton, SvgIcon } from 'ui';
import Calendar from './Calendar';
import { useLocation } from 'react-router-dom';
import { MATERIALS_TYPES } from 'constants';
import { useActiveLinks, useWindowWidth } from 'hooks';

const FiltersBlock = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const onClick: any = () => {
    setShowDropdown(!showDropdown);
  };

  const borderRadius = showDropdown ? 'rounded-t-xl' : 'rounded-xl';

  return (
    <div className={`w-full ${!activeLinks.isHomeActive ? 'mb-10 md:w-1/2' : ''}`}>
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
        <form
          className={`grid max-lg:grid-cols-6 ${
            activeLinks.isReadActive
              ? 'max-lg:grid-rows-4 lg:grid-cols-9'
              : 'max-lg:grid-rows-5 lg:grid-cols-10'
          } gap-3.5 md:gap-5 lg:grid-rows-3 bg-accentLightForeground transition-colors p-3.5 rounded-b-xl`}
        >
          <Input
            inputData={{ name: 'keyword', type: 'text', placeholder: 'Keyword' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
          />
          <Input
            inputData={{ name: 'author', type: 'text', placeholder: 'Author' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
          />
          <Input
            inputData={{ name: 'title', type: 'text', placeholder: 'Title' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
          />
          {!activeLinks.isReadActive && breakpointsForMarkup?.isDesktop && (
            <div className='flex justify-center md:justify-center lg:col-start-10'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              >
                <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          <Input
            inputData={{ name: 'publisher', type: 'text', placeholder: 'Publisher' }}
            hasIcon={true}
            variant='searchBlock'
            className='col-span-3 lg:col-span-3'
          />
          {!activeLinks.isReadActive && (
            <div className={`${breakpointsForMarkup?.isDesktop ? 'col-span-3' : 'col-span-5'}`}>
              <Dropdown labels={MATERIALS_TYPES}>Type</Dropdown>
            </div>
          )}
          {activeLinks.isReadActive && (
            <>
              <div className='col-span-3'>
                <Dropdown labels={MATERIALS_TYPES}>Type</Dropdown>
              </div>
              <div className='flex items-center justify-end'>
                <span className='text-contrastWhite'>Sort:</span>
              </div>
              <div className='flex justify-center md:justify-center lg:col-start-8'>
                <button
                  type='button'
                  className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
                >
                  <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
                </button>
              </div>
              <div className='flex justify-center md:justify-center lg:col-start-9'>
                <button
                  type='button'
                  className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
                >
                  <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
                </button>
              </div>
            </>
          )}
          {!activeLinks.isReadActive && !breakpointsForMarkup?.isDesktop && (
            <div className='flex justify-center md:justify-center'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              >
                <SvgIcon svgName='icon-dateSort-asc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          {breakpointsForMarkup?.isDesktop && !activeLinks.isReadActive ? (
            <div className='lg:col-span-3'>
              <Calendar />
            </div>
          ) : null}

          {!breakpointsForMarkup?.isDesktop && !activeLinks.isReadActive ? (
            <div className='col-span-5'>
              <Calendar />
            </div>
          ) : null}
          {!activeLinks.isReadActive && (
            <div className='flex justify-center md:justify-center'>
              <button
                type='button'
                className='p-2.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors'
              >
                <SvgIcon svgName='icon-dateSort-desc' size={20} className='fill-whiteBase' />
              </button>
            </div>
          )}
          <div
            className={`col-span-5 ${activeLinks.isReadActive ? 'lg:col-span-7' : 'lg:col-span-8'}`}
          >
            <PrimaryButton buttonData={{ type: 'submit' }} variant='SearchBlock'>
              Submit
            </PrimaryButton>
          </div>

          {breakpointsForMarkup?.isDesktop ? (
            <div className='col-span-2'>
              <PrimaryButton
                buttonData={{ type: 'reset' }}
                hasIcon={true}
                variant='SearchBlock'
                svgName='icon-reset'
                svgSize={16}
                className='fill-whiteBase'
              >
                Reset
              </PrimaryButton>
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <button
                type='button'
                className='p-3 bg-accentBase hover:bg-accentAlt transition-colors rounded-[10px]'
              >
                <SvgIcon svgName='icon-reset' size={16} className='fill-whiteBase' />
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default FiltersBlock;