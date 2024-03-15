import React, { FC, ReactNode } from 'react';

interface MobileContainerProps {
  isOpen: boolean | undefined;
  children: ReactNode;
}

const MobileContainer: FC<MobileContainerProps> = ({ isOpen, children }) => {
  const backgroundMenuStyles = `before:h-81px fixed top-0 z-45 h-screen w-screen overflow-auto bg-whiteBase pb-[18px] pt-[147px] transition-all duration-500 before:fixed before:left-0 before:top-0 before:z-[8] before:w-full before:content-[""] dark:bg-darkBackground ${
    isOpen ? 'left-0' : '-left-full'
  }`;

  const containerStyles = 'container mx-auto px-4 flex h-full flex-col justify-between';

  return (
    <div className={`${backgroundMenuStyles}`}>
      <div className={`${containerStyles}`}>{children}</div>
    </div>
  );
};

export default MobileContainer;
