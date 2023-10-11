import React from 'react';
import SvgIcon from './SvgIcon';

type InputCollectedData = { name: string; type: string; placeholder: string };

const Input = (inputData: InputCollectedData, hasIcon: boolean = true) => {
  const { name, type, placeholder } = inputData;

  return (
    //Инпут пока что со своей рамкой при фокусе, будет исправлено в первых же правках
    <form className='relative flex gap-4 items-center  px-3 py-1.5'>
      {hasIcon && (
        <span className='absolute w-5 h-5 left-6 flex items-center justify-center'>
          <SvgIcon
            svgName='icon-search'
            size={20}
            stroke='stroke-none'
            fill='fill-black'
          />
        </span>
      )}

      <input
        className='py-1.5 w-44 pl-11 border-solid border border-black rounded-3xl '
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
      />
    </form>
  );
};

export default Input;
