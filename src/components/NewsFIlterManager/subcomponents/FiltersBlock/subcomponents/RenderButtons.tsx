import React from 'react';

import { PrimaryButton } from 'ui';

import { IControlButtons } from '../types';

export const RenderButtons = (buttons: IControlButtons[]) => {
  return (
    <>
      {Array.isArray(buttons) &&
        buttons.map(
          (
            {
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
            },
            index,
          ) => (
            <React.Fragment key={index}>
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
