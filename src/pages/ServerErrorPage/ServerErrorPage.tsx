import React, { FC } from 'react';

import { ErrorTemplate } from '../template';

import { useServerError } from './hooks';

const ErrorPage: FC = () => {
  const { code, message, warning } = useServerError();

  return (
    <ErrorTemplate title={code ?? ''} description={message ?? ''} titleStyles='text-[100px]'>
      <h2 className='text-5xl text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        {warning}
      </h2>
    </ErrorTemplate>
  );
};

export default ErrorPage;
