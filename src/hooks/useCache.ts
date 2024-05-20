import { useQueryClient } from '@tanstack/react-query';

const useCache = () => {
  const queryClient = useQueryClient();

  const cacheIcon = (iconName: string): string => {
    const cachedData = queryClient.getQueryData<string>(['icon', iconName]);
    return cachedData || iconName;
  };

  const cacheImage = (imageName: string): string => {
    const cachedData = queryClient.getQueryData<string>(['image', imageName]);
    return cachedData || imageName;
  };

  return { cacheIcon, cacheImage };
};

export default useCache;
