import React, { FC, ReactNode } from 'react';

import Container from '../../Container';
import { getMobileContainerWrapperStyles } from '../assistants';

interface MobileContainerProps {
  isOpen: boolean;
  children: ReactNode;
}

const MobileContainer: FC<MobileContainerProps> = ({ isOpen, children }) => {
  const wrapperClass = getMobileContainerWrapperStyles(isOpen);

  return (
    <div className={wrapperClass}>
      <Container className='flex h-full flex-col justify-between'>{children}</Container>
    </div>
  );
};

export default MobileContainer;
