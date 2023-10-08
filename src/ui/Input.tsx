import React from 'react';
import SvgIcon from './SvgIcon';

type InputCollectedData = { name: string; type: string; placeholder: string };

const Input = (inputData: InputCollectedData, hasIcon: boolean = true) => {
  const { name, type, placeholder } = inputData;

  console.log(hasIcon);

  return (
    //Инпут пока что со своей рамкой при фокусе, будет исправлено в первых же правках
    <form className='border-solid border border-black rounded-3xl flex gap-4 items-center  px-3 py-1.5'>
      {hasIcon && (
        <SvgIcon svgName='icon-search' size='20px' stroke='none' fill='black' />
      )}

      <input
        className='w-44'
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
      />
    </form>
  );
};

export default Input;
