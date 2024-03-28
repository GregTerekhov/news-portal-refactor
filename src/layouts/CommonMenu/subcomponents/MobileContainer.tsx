import React, { FC, ReactNode } from 'react';

import Container from '../../Container';

interface MobileContainerProps {
  isOpen: boolean | undefined;
  children: ReactNode;
}

const MobileContainer: FC<MobileContainerProps> = ({ isOpen, children }) => {
  const backgroundMenuStyles = `before:h-81px fixed top-0 z-45 h-screen w-screen overflow-auto bg-whiteBase pb-[18px] pt-[147px] transition-all duration-500 before:fixed before:left-0 before:top-0 before:z-[8] before:w-full before:content-[""] dark:bg-darkBackground ${
    isOpen ? 'left-0' : '-left-full'
  }`;

  return (
    <div className={`${backgroundMenuStyles}`}>
      <Container className='flex h-full flex-col justify-between'>{children}</Container>
    </div>
  );
};

export default MobileContainer;
