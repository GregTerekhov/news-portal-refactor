import { useQueryClient } from '@tanstack/react-query';

const useCacheIcon = (iconName: string): string => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<string>(['icon', iconName]);
  return cachedData || iconName;
};

export default useCacheIcon;
