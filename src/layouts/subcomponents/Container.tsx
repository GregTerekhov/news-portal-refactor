import React, { FC, ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<IContainerProps> = ({ children, className }) => {
  return <div className={`${className ?? ''} container mx-auto px-4 hg:px-[65px]`}>{children}</div>;
};

export default Container;
