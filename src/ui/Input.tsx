import React from 'react';
import SvgIcon from './SvgIcon';

type InputCollectedData = { name: string; type: string; placeholder: string };

const Input = (inputData: InputCollectedData, hasIcon: boolean) => {
  const { name, type, placeholder } = inputData;

  return (
    //Инпут пока что со своей рамкой при фокусе, будет исправлено в первых же правках
    <label className='relative flex gap-4 items-center'>
      {hasIcon && (
        <span className='absolute w-5 h-5 left-3 flex items-center justify-center'>
          <SvgIcon svgName='icon-search' size={20} stroke='stroke-none' fill='fill-black' />
        </span>
      )}

      <input
        className='py-[5px] w-[173px] md:w-[213px] lg:w-72 pl-11 bg-whiteBase border-solid border border-darkBase rounded-3xl outline-0'
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
      />
    </label>
  );
};

export default Input;
