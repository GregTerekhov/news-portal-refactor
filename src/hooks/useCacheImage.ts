import { useQueryClient } from '@tanstack/react-query';

const useCacheImage = (imageName: string): string => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<string>(['image', imageName]);
  return cachedData || imageName;
};

export default useCacheImage;
