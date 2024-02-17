import React, { FC, ReactNode } from 'react';

interface MobileContainerProps {
  isOpen: boolean | undefined;
  navId: string;
  children: ReactNode;
}

const MobileContainer: FC<MobileContainerProps> = ({ isOpen, navId, children }) => {
  return (
    <div
      className={`before:h-81px fixed top-0 z-45 h-screen w-screen overflow-auto bg-whiteBase pb-[18px] pt-[147px] transition-all duration-500 before:fixed before:left-0 before:top-0 before:z-[8] before:w-full before:content-[""] dark:bg-darkBackground ${
        isOpen ? 'left-0' : '-left-full'
      }`}
    >
      <div
        className={`container mx-auto px-4 ${
          navId === 'main-navigation' ? 'flex h-full flex-col justify-between' : 'space-y-6'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
