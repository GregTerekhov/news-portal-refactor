import React from 'react';
import SvgIcon from './SvgIcon';

type PrimaryButtCommon = {
  name: string | null;
  type: 'button' | 'submit' | 'reset';
  hasIcon: boolean;
};

const PrimaryButton = (data: PrimaryButtCommon) => {
  const { name, type, hasIcon } = data;

  return (
    <button type={type}>
      {hasIcon ? (
        <SvgIcon
          svgName='icon-burger-menu'
          size='16px'
          stroke='black'
          fill='none'
        />
      ) : (
        name
      )}
    </button>
  );
};

export default PrimaryButton;
