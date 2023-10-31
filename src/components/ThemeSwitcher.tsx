import { Switch } from '@headlessui/react';
import { useActiveLinks, useHeaderStyles, useWindowWidth } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SvgIcon } from 'ui';

enum V {
  Modal = 'modal',
  Header = 'header',
}

interface Variant {
  variant: string;
}

const ThemeSwitcher = ({ variant }: Partial<Variant>) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { switcherTextClass } = useHeaderStyles(activeLinks.isHomeActive);

  let spacing: string = '';

  if (variant === V.Modal) {
    spacing = 'mr-4';
  } else if (variant === V.Header) {
    spacing = 'justify-end';
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setEnabled(true);
      document.documentElement.classList.add('dark');
    } else {
      setEnabled(false);
      document.documentElement.classList.remove('dark');
    }
  }, [enabled]);

  const handleThemeChange = () => {
    const newTheme = !enabled;
    setEnabled(newTheme);

    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`flex items-center gap-2 ${spacing}`}>
      {breakpointsForMarkup?.isDesktop ? (
        <p
          className={`font-header text-xl leading-tighter ${
            enabled ? switcherTextClass : 'text-accentAlt'
          }`}
        >
          Light
        </p>
      ) : (
        <SvgIcon
          svgName='icon-sun'
          size={21}
          className={`fill-transparent ${enabled ? 'stroke-greyBase' : 'stroke-accentAlt'}`}
        />
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        onClick={handleThemeChange}
        className={`${
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
          className={`font-header text-xl leading-tighter ${
            enabled ? 'text-accentAlt' : switcherTextClass
          }`}
        >
          Dark
        </p>
      ) : (
        <SvgIcon
          svgName='icon-moon'
          size={21}
          className={`fill-transparent ${enabled ? 'stroke-accentAlt' : 'stroke-greyBase'}`}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
