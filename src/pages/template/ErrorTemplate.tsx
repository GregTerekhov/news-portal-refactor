import React, { FC, ReactNode } from 'react';

import { useActiveLinks } from 'hooks';

import { NavigationErrorButtons } from 'components';

interface ErrorTemplateProps {
  title: string | number;
  description: string;
  titleStyles: string;
  children: ReactNode;
}

const ErrorTemplate: FC<ErrorTemplateProps> = ({ title, description, titleStyles, children }) => {
  const { isErrorPage, isServerErrorPage, isDevelopmentActive } = useActiveLinks();

  return (
    <div className='space-y-10 text-center lg:mx-auto lg:w-900px'>
      {isErrorPage ? children : null}
      <h1
        className={`${titleStyles} text-darkBase transition-colors duration-500 dark:text-whiteBase`}
      >
        {title}
      </h1>
      {isDevelopmentActive ? children : null}
      {isServerErrorPage ? children : null}
      <p className='text-justify text-xl text-darkBase transition-colors duration-500 dark:text-whiteBase md:text-center'>
        {description}
      </p>
      <NavigationErrorButtons />
    </div>
  );
};

export default ErrorTemplate;
