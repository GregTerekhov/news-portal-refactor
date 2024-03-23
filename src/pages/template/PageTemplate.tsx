import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDB, useNewsAPI } from 'reduxStore/hooks';
import { useNotification } from 'contexts';

import { useActiveLinks, useChooseRenderingNews } from 'hooks';

import { Toast } from 'components';
import { Loader, PlugImage } from 'ui';

import { useShowLoader, useShowPlug, useShowContent, useShowToast } from './hooks';

interface PageTemplateProps {
  children: ReactElement | ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  const { errorDB } = useDB();
  const { authError } = useAuthRedux();
  const { errorAPI } = useNewsAPI();
  const { setOpenToast } = useNotification();

  const activeLinks = useActiveLinks();
  const { rebuildedNews } = useChooseRenderingNews(activeLinks);
  const { shouldShowLoader } = useShowLoader();
  const { shouldShowPlug } = useShowPlug();
  const { shouldShowContent } = useShowContent();
  const { shouldShowToast, statusToast, toastType } = useShowToast();

  const navigate = useNavigate();

  const { isFavoriteActive, isReadActive } = activeLinks;

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

  return (
    <>
      {shouldShowLoader && <Loader variant='generalSection' />}
      {shouldShowToast && <Toast variant={toastType} status={statusToast} />}
      {shouldShowPlug && <PlugImage variant='page' />}
      {shouldShowContent && children}
    </>
  );
};

export default PageTemplate;
