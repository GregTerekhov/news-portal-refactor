import React from 'react';

import type { IFilterButtons } from 'types';

import { PrimaryButton } from 'ui';

export const RenderButtons = (buttons: IFilterButtons[]) => {
  return (
    <>
      {Array.isArray(buttons) &&
        buttons.map(
          ({
            type,
            id,
            variant,
            onHandleClick,
            ariaLabel,
            classNameButtons,
            hasIcon,
            svgName,
            svgSize,
            classNameIcon,
            children,
            disabled,
          }) => (
            <React.Fragment key={id ? id : ariaLabel}>
              <PrimaryButton
                type={type}
                id={id}
                variant={variant}
                onHandleClick={onHandleClick}
                ariaLabel={ariaLabel}
                classNameButton={classNameButtons}
                hasIcon={hasIcon}
                svgName={svgName}
                svgSize={svgSize}
                classNameIcon={classNameIcon}
                disabled={disabled}
              >
                {children}
              </PrimaryButton>
            </React.Fragment>
          ),
        )}
    </>
  );
};
