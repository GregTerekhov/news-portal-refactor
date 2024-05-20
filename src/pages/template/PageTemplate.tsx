import React, { FC, ReactElement, ReactNode } from 'react';

import { VariantPlug } from 'types';

import { Toast } from 'components';
import { Loader, PlugImage } from 'ui';

import { useShowLoader, useShowPlug, useShowContent, useShowToast, useHeadline } from './hooks';

interface IPageTemplateProps {
  children: ReactElement | ReactNode;
}

const PageTemplate: FC<IPageTemplateProps> = ({ children }) => {
  const { shouldShowLoader } = useShowLoader();
  const { shouldShowPlug } = useShowPlug();
  const { shouldShowContent } = useShowContent();
  const { shouldShowToast, statusToast, toastType } = useShowToast();
  const { getHeadline } = useHeadline();

  return (
    <>
      {shouldShowLoader && <Loader variant='generalSection' />}
      {shouldShowToast && <Toast variant={toastType} status={statusToast} />}
      {shouldShowPlug && <PlugImage variant={VariantPlug.Page} />}
      {shouldShowContent && (
        <h1 className='mb-6 text-giant font-bold dark:text-whiteBase'>{getHeadline()}</h1>
      )}
      {shouldShowContent && children}
    </>
  );
};

export default PageTemplate;
