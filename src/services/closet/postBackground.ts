import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../instance';
import { PostItemType } from '@/types/closetType';

const fetchPostBackground = async (item_name: PostItemType) => {
  const itemName = JSON.stringify(item_name);
  const response = await axios.post(`pets/closet/select-background/`, itemName);
  console.log(response.data);
  return response.data;
};

export const usePostBackground = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ item_name }: PostItemType) => fetchPostBackground({ item_name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backgroundList'] });
    },
  });
};
