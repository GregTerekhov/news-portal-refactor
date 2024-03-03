import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';

import PrimaryButton from '../../PrimaryButton/PrimaryButton';

type MenuButton = {
  id: string;
  iconName: string;
  iconSize: number;
  iconClassName: string;
  onClick?: (() => void) | undefined;
  children: ReactNode;
};

interface MenuButtonsProps {
  handleSignOut?: (() => void) | undefined;
  handleLinkClick?: (() => void) | undefined;
  navId: string;
}

const MenuButtons: FC<Partial<MenuButtonsProps>> = ({ handleSignOut, handleLinkClick, navId }) => {
  const { isMobile, isTV } = useWindowWidth();

  const buttons: MenuButton[] = [
    {
      id: 'Sign out button',
      iconName: 'icon-signout',
      iconSize: isTV ? ICON_SIZES.mdIcon27 : ICON_SIZES.mdIcon24,
      iconClassName: 'fill-whiteBase',
      onClick: handleSignOut,
      children: 'Sign Out',
    },
    {
      id: 'Go home',
      iconName: 'icon-home',
      iconSize: ICON_SIZES.smIcon20,
      iconClassName: 'stroke-whiteBase fill-transparent',
      onClick: handleLinkClick,
      children: <Link to='/'>Home</Link>,
    },
  ];

  const firstButton = buttons.find((button) => button.id === 'Sign out button');

  return (
    <>
      {isMobile && navId === 'account-navigation' && (
        <>
          {buttons.map(({ id, iconName, iconSize, iconClassName, onClick, children }) => (
            <PrimaryButton
              key={iconName}
              id={id}
              classNameButton='border border-solid border-transparent dark:border-whiteBase'
              hasIcon={true}
              variant={VariantButton.Other}
              width='w-32'
              svgName={iconName}
              svgSize={iconSize}
              classNameIcon={iconClassName}
              onHandleClick={onClick}
            >
              {children}
            </PrimaryButton>
          ))}
        </>
      )}
      {isMobile && navId === 'main-navigation' && firstButton && (
        <PrimaryButton
          key={firstButton.iconName}
          id={firstButton.id}
          classNameButton='border border-solid border-transparent dark:border-whiteBase'
          hasIcon={true}
          variant={VariantButton.Other}
          width='w-32'
          svgName={firstButton.iconName}
          svgSize={firstButton.iconSize}
          classNameIcon={firstButton.iconClassName}
          onHandleClick={firstButton.onClick}
        >
          {firstButton.children}
        </PrimaryButton>
      )}
      {!isMobile && navId === 'account-navigation' && firstButton && (
        <PrimaryButton
          key={firstButton.iconName}
          id={firstButton.id}
          classNameButton='border border-solid border-transparent dark:border-whiteBase'
          hasIcon={true}
          variant={VariantButton.Other}
          width='w-36'
          svgName={firstButton.iconName}
          svgSize={firstButton.iconSize}
          classNameIcon={firstButton.iconClassName}
          onHandleClick={firstButton.onClick}
        >
          {firstButton.children}
        </PrimaryButton>
      )}
    </>
  );
};

export default MenuButtons;
