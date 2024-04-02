import React, { FC, useEffect, useRef } from 'react';

const InfiniteScroll: FC<{ onLoadMore: () => void }> = ({ onLoadMore }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [onLoadMore]);

  return <div ref={sentinelRef}></div>;
};

export default InfiniteScroll;
