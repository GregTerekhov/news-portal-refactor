import React, { FC, ReactNode } from 'react';

interface ISkeletonItemProps {
  count: number;
  className: string;
  itemClassName: string;
}

const SkeletonItem: FC<ISkeletonItemProps> = ({ count, className, itemClassName }) => {
  const items: ReactNode[] = Array(count)
    .fill(null)
    .map((_, index) => <div key={index} className={itemClassName}></div>);

  return <div className={className}>{items}</div>;
};

export default SkeletonItem;
