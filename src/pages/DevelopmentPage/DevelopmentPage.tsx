import React, { FC } from 'react';

import { ErrorTemplate } from '../template';
import { SvgIcon } from 'ui';

const DevelopmentPage: FC = () => {
  return (
    <ErrorTemplate
      title='Under Construction: Feature in Development'
      description='We`re currently working on enhancing this feature to provide you with an even better experience. Please excuse the inconvenience as we continue development. Check back soon for updates!'
      titleStyles='text-3xl lg:text-5xl'
    >
      <SvgIcon svgName='development' className='mx-auto fill-accentBase' sizeKey='ultraIcon156' />
    </ErrorTemplate>
  );
};

export default DevelopmentPage;
