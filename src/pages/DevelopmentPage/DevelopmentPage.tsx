import React, { FC } from 'react';

import { NavigationErrorButtons } from 'components';
import { SvgIcon } from 'ui';

const DevelopmentPage: FC = () => {
  return (
    <div className='space-y-10 text-center md:mx-auto lg:w-900px'>
      <h1 className='text-3xl text-darkBase transition-colors duration-500 dark:text-whiteBase lg:text-5xl'>
        Under Construction: Feature in Development
      </h1>

      <SvgIcon svgName='development' className='mx-auto fill-accentBase' sizeKey='ultraIcon156' />
      <p className='text-justify text-xl text-darkBase transition-colors duration-500 dark:text-whiteBase md:text-center'>
        We're currently working on enhancing this feature to provide you with an even better
        experience. Please excuse the inconvenience as we continue development. Check back soon for
        updates!
      </p>
      <NavigationErrorButtons />
    </div>
  );
};

export default DevelopmentPage;
