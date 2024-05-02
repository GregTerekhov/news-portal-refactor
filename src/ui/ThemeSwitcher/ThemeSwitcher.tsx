import React, { FC } from 'react';
import { Switch } from '@headlessui/react';

import { VariantSwitcher } from 'types';
import { useThemeContext, useWindowWidthContext } from 'contexts';

import { useActiveLinks, useHeaderStyles } from 'hooks';

import SvgIcon from '../SvgIcon/SvgIcon';

import {
  generateSwitcherStyles,
  getCommonLabelStyles,
  getSwitchFieldStyles,
  getSwitchSliderStyles,
} from './assistants';

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
      <p
        className={`${getCommonLabelStyles(isHomeActive, variant, themeSwitcherTextClass)} ${getStyles().labelStyles}`}
      >
        {themeType}
      </p>
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
        className={getSwitchFieldStyles(enabled)}
      >
        <span className='sr-only'>Theme switcher</span>
        <span aria-hidden='true' className={getSwitchSliderStyles(enabled)} />
      </Switch>
      {generatePointerThemeLabel('Dark', 'moon')}
    </div>
  );
};

export default ThemeSwitcher;
