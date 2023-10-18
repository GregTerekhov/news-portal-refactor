import React, { useState } from 'react';
import { SvgIcon } from 'ui';

enum V {
  Modal = 'modal',
  Header = 'header',
}

interface Variant {
  variant: string;
}

const ThemeSwitcher = ({ variant }: Partial<Variant>) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setIsCheck(e.target.checked);
  };

  let spacing: string = '';

  if (variant === V.Modal) {
    spacing = 'mr-4';
  } else if (variant === V.Header) {
    spacing = 'justify-end';
  }

  const onCheck: any = {
    labelBColor: isCheck ? 'bg-accentBase' : 'bg-greyIcon',
    spanBgColor: isCheck ? 'bg-whiteBase' : 'bg-accentBase',
    spanTransition: isCheck ? 'translate-x-4' : 'translate-x-0',
    divBorder: isCheck ? 'border-solid border-2 border-accentBase rounded-xl' : '',
    sunIcon: isCheck ? 'black' : 'blue',
    moonIcon: isCheck ? 'blue' : 'black',
  };

  return (
    <div className={`flex items-center gap-2 ${spacing}`}>
      <SvgIcon svgName='icon-sun' size={21} fill='none' stroke={onCheck.sunIcon} />
      <div
        className={`flex items-center justify-center gap-0 h-6 w-10 overflow-hidden bg-whiteBase ${onCheck.divBorder} `}
      >
        <input
          className='hidden'
          type='checkbox'
          name='switch'
          id='toggleSwitch'
          onChange={handleChange}
        />
        <label
          className={`${onCheck.labelBColor} relative block cursor-pointer h-4 w-8 rounded-xl`}
          htmlFor='toggleSwitch'
        >
          <span
            className={`absolute top-50% left-0 translate-y-50%- z-10 block w-5 h-5 ${onCheck.spanBgColor} rounded-xl transition duration-100 ${onCheck.spanTransition}`}
          />
        </label>
      </div>
      <SvgIcon svgName='icon-moon' size={21} fill='none' stroke={onCheck.moonIcon} />
    </div>
  );
};

export default ThemeSwitcher;
