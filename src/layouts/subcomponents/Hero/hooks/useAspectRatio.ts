import { useEffect, useState } from 'react';

const useAspectRation = () => {
  const [aspectWidth, setAspectWidth] = useState<number>(window.innerWidth);
  const [aspectHeight, setAspectHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setAspectWidth(window.innerWidth);
      setAspectHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { aspectWidth, aspectHeight };
};

export default useAspectRation;
