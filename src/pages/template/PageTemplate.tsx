import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { Toast } from 'components';
import { Loader, PlugImage } from 'ui';

import { useShowLoader, useShowPlug, useShowContent, useShowToast } from './hooks';

interface PageTemplateProps {
  children: ReactElement | ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  const { errorDB } = useDBRedux();
  const { authError } = useAuthRedux();
  const { errorAPI, headline } = useNewsAPIRedux();
  const { setOpenToast } = useNotificationContext();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);
  const { shouldShowLoader } = useShowLoader();
  const { shouldShowPlug } = useShowPlug();
  const { shouldShowContent } = useShowContent();
  const { shouldShowToast, statusToast, toastType } = useShowToast();

  const navigate = useNavigate();

  const { isHomeActive, isFavoriteActive, isReadActive, isArchiveActive } = activeLinks;

  useEffect(() => {
    if (
      (errorDB && typeof errorDB === 'number' && errorDB >= 500) ||
      (errorAPI && errorAPI >= 500) ||
      (authError && typeof authError === 'number' && authError >= 500)
    ) {
      navigate('/server-error');
    }
  }, [errorDB, errorAPI]);

  useEffect(() => {
    if ((isFavoriteActive || isReadActive) && rebuildedNews?.length > 0) setOpenToast(true);
  }, []);

  const getHeadline = (): string => {
    switch (true) {
      case headline && isHomeActive:
        return headline;
      case isFavoriteActive:
        return 'Favourite news';
      case isReadActive:
        return 'Read news';
      case isArchiveActive:
        return 'Archive news';

      default:
        return '';
    }
  };

  return (
    <>
      {shouldShowLoader && <Loader variant='generalSection' />}
      {shouldShowToast && <Toast variant={toastType} status={statusToast} />}
      {shouldShowPlug && <PlugImage variant='page' />}
      {shouldShowContent && (
        <h1 className='mb-6 text-giant font-bold dark:text-whiteBase'>{getHeadline()}</h1>
      )}
      {shouldShowContent && children}
    </>
  );
};

export default PageTemplate;
