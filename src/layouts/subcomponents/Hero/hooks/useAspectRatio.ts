import { useEffect, useState } from 'react';

interface AspectRatio {
  width: number;
  height: number;
}

const useAspectRation = () => {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return aspectRatio;
};

export default useAspectRation;
