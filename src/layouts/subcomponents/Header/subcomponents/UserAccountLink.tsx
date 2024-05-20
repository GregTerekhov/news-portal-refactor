import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IconName, IconSizes, Paths } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useHeaderStyles } from 'hooks';

import { SvgIcon } from 'ui';

type IUserAccountLinkProps = {
  isHomeActive: boolean;
};

const UserAccountLink: FC<IUserAccountLinkProps> = ({ isHomeActive }) => {
  const { user } = useAuthRedux();
  const { textClass, accountIconStyles } = useHeaderStyles(isHomeActive);

  const accountLinkStyles = `absolute right-40 z-10 top-1.5 flex items-center gap-3 lg:right-60 hg:right-72 hg:text-xl group transition-colors duration-500 hocus:text-accentBase dark:hocus:text-accentBase ${isHomeActive ? textClass : 'text-darkBase dark:text-whiteBase'}`;

  const iconStyles = `${
    isHomeActive
      ? accountIconStyles
      : 'fill-darkBase group-hover:fill-accentBase group-focus:fill-accentBase dark:fill-whiteBase'
  }`;

  return (
    <Link to={Paths.Account} className={accountLinkStyles}>
      {user.name}
      <SvgIcon svgName={IconName.Account} sizeKey={IconSizes.smIcon18} className={iconStyles} />
    </Link>
  );
};

export default UserAccountLink;
