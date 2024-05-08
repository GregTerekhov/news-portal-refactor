import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import type { NavId } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';

import MenuLinks from './MenuLinks';

interface AdditionalContentProps {
  navId: NavId;
  handleLinkClick: () => void;
  closeMenu?: (() => void) | undefined;
}

const AdditionalContent: FC<AdditionalContentProps> = ({ navId, handleLinkClick, closeMenu }) => {
  const { user } = useAuthRedux();

  return navId === 'account-navigation' ? (
    <div>
      <p className='mb-2 text-darkBase dark:text-whiteBase'>Main Menu</p>
      <hr className='mb-4 !border-accentBase' />
      <div className='grid grid-cols-2 grid-rows-2 gap-3'>
        <MenuLinks handleLinkClick={handleLinkClick} />
      </div>
    </div>
  ) : (
    <Link
      to='/account'
      className='text-end text-darkBase transition-colors duration-500 dark:text-whiteBase'
      onClick={closeMenu}
    >
      Your account, {user.name}
    </Link>
  );
};

export default AdditionalContent;
