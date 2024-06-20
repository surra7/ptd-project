import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../instance';
import { PostItemType } from '@/types/closetType';

const fetchPostAccessory = async (item_name: PostItemType) => {
  const itemName = JSON.stringify(item_name);
  const response = await axios.post(`pets/closet/select-accessory/`, itemName);
  console.log(response.data);
  return response.data;
};

export const usePostAccessory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ item_name }: PostItemType) => fetchPostAccessory({ item_name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accessoryList'] });
    },
  });
};
