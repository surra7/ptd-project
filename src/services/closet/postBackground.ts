import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../instance';
import { postItemType } from '@/types/closetType';

const fetchPostBackground = async (item_name: postItemType) => {
  const itemName = JSON.stringify(item_name);
  const response = await axios.post(`pets/closet/select-background/`, itemName);
  console.log(response.data);
  return response.data;
};

export const usePostBackground = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ item_name }: postItemType) => fetchPostBackground({ item_name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backgroundList'] });
    },
  });
};
