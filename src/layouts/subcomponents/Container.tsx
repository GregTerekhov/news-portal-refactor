import React, { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`${className ? className : ''} container mx-auto px-4 hg:px-[65px]`}>
      {children}
    </div>
  );
};

export default Container;
