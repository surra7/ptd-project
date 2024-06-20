import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../instance';
import { postItemType } from '@/types/closetType';

const fetchPostAccessory = async (item_name: postItemType) => {
  const itemName = JSON.stringify(item_name);
  const response = await axios.post(`pets/closet/select-accessory/`, itemName);
  console.log(response.data);
  return response.data;
};

export const usePostAccessory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ item_name }: postItemType) => fetchPostAccessory({ item_name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accessoryList'] });
    },
  });
};
