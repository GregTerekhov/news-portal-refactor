import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { VariantButton } from 'types';
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
  closeMenuByClickOnLink?: (() => void) | undefined;
  navId: string;
}

const MenuButtons: FC<Partial<MenuButtonsProps>> = ({
  handleSignOut,
  closeMenuByClickOnLink,
  navId,
}) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const buttons: MenuButton[] = [
    {
      id: 'Sign out button',
      iconName: 'icon-signout',
      iconSize: 24,
      iconClassName: 'fill-whiteBase',
      onClick: handleSignOut,
      children: 'Sign Out',
    },
    {
      id: 'Go home',
      iconName: 'icon-home',
      iconSize: 20,
      iconClassName: 'stroke-whiteBase fill-transparent',
      onClick: closeMenuByClickOnLink,
      children: <Link to='/'>Home</Link>,
    },
  ];

  const isMobile = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;

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
          width='w-32'
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
