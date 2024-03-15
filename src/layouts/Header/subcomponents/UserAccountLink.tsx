import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { ICON_SIZES } from 'constants/iconSizes';
import { useHeaderStyles } from 'hooks';

import { SvgIcon } from 'ui';

type UserAccountLinkProps = {
  isHomeActive: boolean;
};

const UserAccountLink: FC<UserAccountLinkProps> = ({ isHomeActive }) => {
  const { user } = useAuthRedux();
  const { textClass, accountIconStyles } = useHeaderStyles(isHomeActive);

  const accountLinkStyles = `absolute right-40 top-1.5 flex items-center gap-3 lg:right-60 hg:right-72 hg:text-xl  ${
    isHomeActive ? textClass : 'text-darkBase dark:text-whiteBase'
  } group transition-colors duration-500 hover:text-accentBase dark:hover:text-accentBase`;

  return (
    <Link to='/account' className={`${accountLinkStyles}`}>
      {user.name}
      <SvgIcon
        svgName='account'
        size={ICON_SIZES.smIcon18}
        className={`${
          isHomeActive
            ? accountIconStyles
            : 'fill-darkBase group-hover:fill-accentBase dark:fill-whiteBase'
        }`}
      />
    </Link>
  );
};

export default UserAccountLink;
