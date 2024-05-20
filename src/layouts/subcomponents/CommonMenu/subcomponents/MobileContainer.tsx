import React, { FC, ReactNode } from 'react';

import { Container } from '../..';

import { getMobileContainerWrapperStyles } from '../assistants';

interface IMobileContainerProps {
  isOpen: boolean;
  children: ReactNode;
}

const MobileContainer: FC<IMobileContainerProps> = ({ isOpen, children }) => {
  const wrapperClass = getMobileContainerWrapperStyles(isOpen);

  return (
    <div className={wrapperClass}>
      <Container className='flex h-full flex-col justify-between'>{children}</Container>
    </div>
  );
};

export default MobileContainer;
