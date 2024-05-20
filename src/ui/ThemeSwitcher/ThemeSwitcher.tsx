import React, { FC } from 'react';
import { Switch } from '@headlessui/react';

import { IconName, IconSizes, VariantSwitcher } from 'types';
import { useThemeContext, useWindowWidthContext } from 'contexts';

import { SvgIcon } from '..';

import { useActiveLinks, useHeaderStyles } from 'hooks';
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

enum ThemeType {
  Light = 'Light',
  Dark = 'Dark',
}

const ThemeSwitcher: FC<{ variant: VariantSwitcher }> = ({ variant }) => {
  const { isWideScreens } = useWindowWidthContext();
  const { enabled, setEnabled, handleThemeChange } = useThemeContext();

  const { isHomeActive } = useActiveLinks();
  const { themeSwitcherTextClass } = useHeaderStyles(isHomeActive);

  const styles = generateSwitcherStyles({ enabled });
  const { colorLeftLabel, spacing, strokeLeftIcon } = styles[variant];

  const generatePointerThemeLabel = (themeType: ThemeType, svgName: IconName): JSX.Element => {
    const getStyles = (): Styles => {
      let labelStyles;
      let iconStyles;

      switch (themeType) {
        case ThemeType.Light:
          labelStyles = colorLeftLabel;
          iconStyles = strokeLeftIcon;
          break;
        case ThemeType.Dark:
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

    const { labelStyles, iconStyles } = getStyles();

    return isWideScreens ? (
      <p
        className={`${getCommonLabelStyles(isHomeActive, variant, themeSwitcherTextClass)} ${labelStyles}`}
      >
        {themeType}
      </p>
    ) : (
      <SvgIcon
        svgName={svgName}
        sizeKey={IconSizes.smIcon21}
        className={`fill-transparent ${iconStyles}`}
      />
    );
  };

  return (
    <div className={`flex items-center gap-2 ${spacing}`}>
      {generatePointerThemeLabel(ThemeType.Light, IconName.Sun)}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        onClick={handleThemeChange}
        className={getSwitchFieldStyles(enabled)}
      >
        <span className='sr-only'>Theme switcher</span>
        <span aria-hidden='true' className={getSwitchSliderStyles(enabled)} />
      </Switch>
      {generatePointerThemeLabel(ThemeType.Dark, IconName.Moon)}
    </div>
  );
};

export default ThemeSwitcher;
