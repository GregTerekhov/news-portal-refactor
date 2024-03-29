import React, { FC } from 'react';
import { Switch } from '@headlessui/react';

import { VariantSwitcher } from 'types';
import { useTheme, useWindowWidth } from 'contexts';

import { useActiveLinks, useHeaderStyles } from 'hooks';

import SvgIcon from '../SvgIcon';

import { generateSwitcherStyles } from './assistants';

const ThemeSwitcher: FC<{ variant: VariantSwitcher }> = ({ variant }) => {
  const { wideScreens } = useWindowWidth();

  const { enabled, setEnabled, handleThemeChange } = useTheme();

  const { isHomeActive } = useActiveLinks();

  const { themeSwitcherTextClass } = useHeaderStyles(isHomeActive);

  const styles = generateSwitcherStyles({ enabled });
  const currentStyles = styles[variant];

  const commonLabelStyles = `${
    isHomeActive && variant !== VariantSwitcher.Modal && themeSwitcherTextClass
  } font-header text-xl leading-tighter hg:text-3xl`;

  const switchFieldStyles = `${
    enabled ? 'border-contrastWhite bg-accentBase' : 'border-accentBase bg-contrastWhite'
  } relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border transition-colors ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hg:h-6 hg:w-11`;

  const switchSliderStyles = `${
    enabled ? 'translate-x-5 bg-contrastWhite' : 'translate-x-[1px] bg-accentBase'
  } pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg ring-0 transition ease-in-out hg:h-5 hg:w-5`;

  return (
    <div className={`flex items-center gap-2 ${currentStyles.spacing}`}>
      {wideScreens ? (
        <p className={`${commonLabelStyles} ${currentStyles.colorLeftLabel}`}>Light</p>
      ) : (
        <SvgIcon
          svgName='sun'
          sizeKey='smIcon21'
          className={`fill-transparent ${currentStyles.strokeLeftIcon}`}
        />
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        onClick={handleThemeChange}
        className={`${switchFieldStyles}`}
      >
        <span className='sr-only'>Theme switcher</span>
        <span aria-hidden='true' className={`${switchSliderStyles}`} />
      </Switch>
      {wideScreens ? (
        <p className={`${commonLabelStyles} ${enabled ? 'text-whiteBase' : 'text-greyAlt'}`}>
          Dark
        </p>
      ) : (
        <SvgIcon
          svgName='moon'
          sizeKey='smIcon21'
          className={`fill-transparent ${enabled ? 'stroke-whiteBase' : 'stroke-greyAlt'}`}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
