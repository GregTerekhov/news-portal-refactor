import React, { FC, ReactNode } from 'react';

interface MobileContainerProps {
  isOpen: boolean | undefined;
  navId: string;
  children: ReactNode;
}

const MobileContainer: FC<MobileContainerProps> = ({ isOpen, navId, children }) => {
  return (
    <div
      className={`fixed top-0 z-45 pb-[18px] pt-[147px] before:fixed before:content-[""] before:z-[8] before:w-full before:h-[81px] before:top-0 before:left-0 overflow-auto transition-all duration-500 bg-whiteBase dark:bg-darkBackground w-screen h-screen ${
        isOpen ? 'left-0' : '-left-full'
      }`}
    >
      <div
        className={`container mx-auto px-4 ${
          navId === 'main-navigation' ? 'flex flex-col justify-between h-full' : 'space-y-6'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
