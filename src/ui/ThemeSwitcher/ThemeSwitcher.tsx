import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Switch } from '@headlessui/react';

import { useTheme, useWindowWidth } from 'contexts';
import { useActiveLinks, useHeaderStyles } from 'hooks';

import SvgIcon from '../SvgIcon';

import { generateSwitcherStyles } from './assistants';

export enum VariantSwitcher {
  Modal = 'modal',
  Header = 'header',
  Footer = 'footer',
}

const ThemeSwitcher: FC<{ variant: VariantSwitcher }> = ({ variant }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const { enabled, setEnabled, handleThemeChange } = useTheme();

  const location = useLocation();
  const { isHomeActive } = useActiveLinks(location);

  const { themeSwitcherClass, themeSwitcherTextClass } = useHeaderStyles(isHomeActive);

  const styles = generateSwitcherStyles({ enabled, isHomeActive, themeSwitcherClass });
  const currentStyles = styles[variant];

  const commonLabelStyles = `${
    isHomeActive && variant !== VariantSwitcher.Modal && themeSwitcherTextClass
  } font-header text-xl leading-tighter`;

  return (
    <div className={`flex items-center gap-2 ${currentStyles.spacing}`}>
      {breakpointsForMarkup?.isDesktop ? (
        <p className={`${commonLabelStyles} ${currentStyles.colorLeftLabel}`}>Light</p>
      ) : (
        <SvgIcon
          svgName='icon-sun'
          size={21}
          className={`fill-transparent ${currentStyles.strokeLeftIcon}`}
        />
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        onClick={handleThemeChange}
        className={`${currentStyles.shadow} ${
          enabled ? 'bg-accentBase border-contrastWhite' : 'bg-contrastWhite border-accentBase'
        }
          relative inline-flex items-center h-5 w-10 shrink-0 cursor-pointer rounded-full border transition-colors duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className='sr-only'>Theme switcher</span>
        <span
          aria-hidden='true'
          className={`${
            enabled ? 'bg-contrastWhite translate-x-5' : 'bg-accentBase translate-x-[1px]'
          }
            pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg ring-0 transition duration-500 ease-in-out`}
        />
      </Switch>
      {breakpointsForMarkup?.isDesktop ? (
        <p className={`${commonLabelStyles} ${enabled ? 'text-whiteBase' : 'text-greyAlt'}`}>
          Dark
        </p>
      ) : (
        <SvgIcon
          svgName='icon-moon'
          size={21}
          className={`fill-transparent ${enabled ? 'stroke-whiteBase' : 'stroke-greyAlt'}`}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
