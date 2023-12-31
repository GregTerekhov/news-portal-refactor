import React, { FC, useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

import { useAuthRedux } from 'reduxStore/hooks';

import { useWindowWidth } from 'contexts';
import { useActiveLinks, useHeaderStyles } from 'hooks';

import { SvgIcon } from 'ui';
import { useLocation } from 'react-router-dom';

enum VariantSwitcher {
  Modal = 'modal',
  Header = 'header',
  Footer = 'footer',
}

interface ThemeSwitcherProps {
  variant?: string;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ variant }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { isAuthenticated, unauthorisedChangeTheme, changeTheme, userTheme } = useAuthRedux();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  // const isAuthenticated = true;

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { themeSwitcherClass, themeSwitcherTextClass } = useHeaderStyles(activeLinks.isHomeActive);

  let spacing: string = '';
  let colorLeftLabel: string = '';
  let strokeLeftIcon: string = '';
  let shadow: string = '';

  if (variant === VariantSwitcher.Header) {
    spacing = 'justify-end';
    shadow = activeLinks.isHomeActive ? themeSwitcherClass : '';
  }

  if (variant === 'footer') {
    colorLeftLabel = enabled ? 'text-greyAlt' : 'text-whiteBase';
    strokeLeftIcon = enabled ? 'stroke-greyAlt' : 'stroke-whiteBase';
  }

  if (variant !== VariantSwitcher.Footer) {
    colorLeftLabel = enabled ? 'text-greyBase' : 'text-accentAlt';
    strokeLeftIcon = enabled ? 'stroke-greyBase' : 'stroke-accentAlt';
  }

  useEffect(() => {
    if (userTheme && userTheme === 'dark') {
      setEnabled(true);
      document.documentElement.classList.add('dark');
    } else {
      setEnabled(false);
      document.documentElement.classList.remove('dark');
    }
  }, [userTheme]);

  const handleThemeChange = async () => {
    const newTheme = !enabled;
    setEnabled(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      if (!isAuthenticated) {
        unauthorisedChangeTheme({ updatedTheme: 'dark' });
      } else {
        changeTheme({ updatedTheme: 'dark' });
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (!isAuthenticated) {
        unauthorisedChangeTheme({ updatedTheme: 'light' });
      } else {
        changeTheme({ updatedTheme: 'light' });
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${spacing}`}>
      {breakpointsForMarkup?.isDesktop ? (
        <p
          className={`${
            activeLinks.isHomeActive && variant !== 'modal' && themeSwitcherTextClass
          } font-header text-xl leading-tighter ${colorLeftLabel}`}
        >
          Light
        </p>
      ) : (
        <SvgIcon svgName='icon-sun' size={21} className={`fill-transparent ${strokeLeftIcon}`} />
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        onClick={handleThemeChange}
        className={`${shadow} ${
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
        <p
          className={`${
            activeLinks.isHomeActive && variant !== 'modal' && themeSwitcherTextClass
          } font-header text-xl leading-tighter ${enabled ? 'text-whiteBase' : 'text-greyAlt'}`}
        >
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
