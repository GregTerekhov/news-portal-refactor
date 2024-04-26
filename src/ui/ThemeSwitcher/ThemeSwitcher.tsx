import React, { FC } from 'react';
import { Switch } from '@headlessui/react';

import { VariantSwitcher } from 'types';
import { useThemeContext, useWindowWidthContext } from 'contexts';

import { useActiveLinks, useHeaderStyles } from 'hooks';

import SvgIcon from '../SvgIcon/SvgIcon';

import { generateSwitcherStyles } from './assistants';

interface Styles {
  labelStyles: string | undefined;
  iconStyles: string | undefined;
}

const ThemeSwitcher: FC<{ variant: VariantSwitcher }> = ({ variant }) => {
  const { wideScreens } = useWindowWidthContext();
  const { enabled, setEnabled, handleThemeChange } = useThemeContext();

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

  const generatePointerThemeLabel = (themeType: string, svgName: string): JSX.Element => {
    const getStyles = (): Styles => {
      let labelStyles;
      let iconStyles;

      switch (themeType) {
        case 'Light':
          labelStyles = currentStyles.colorLeftLabel;
          iconStyles = currentStyles.strokeLeftIcon;
          break;
        case 'Dark':
          labelStyles = enabled ? 'text-whiteBase' : 'text-greyAlt';
          iconStyles = enabled ? 'stroke-whiteBase' : 'stroke-greyAlt';
          break;
        default:
          labelStyles = '';
          iconStyles = '';
          break;
      }

      return { labelStyles, iconStyles };
    };
    return wideScreens ? (
      <p className={`${commonLabelStyles} ${getStyles().labelStyles}`}>{themeType}</p>
    ) : (
      <SvgIcon
        svgName={svgName}
        sizeKey='smIcon21'
        className={`fill-transparent ${getStyles().iconStyles}`}
      />
    );
  };

  return (
    <div className={`flex items-center gap-2 ${currentStyles.spacing}`}>
      {generatePointerThemeLabel('Light', 'sun')}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        onClick={handleThemeChange}
        className={switchFieldStyles}
      >
        <span className='sr-only'>Theme switcher</span>
        <span aria-hidden='true' className={switchSliderStyles} />
      </Switch>
      {generatePointerThemeLabel('Dark', 'moon')}
    </div>
  );
};

export default ThemeSwitcher;
