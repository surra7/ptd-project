import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../instance';
import { PostItemType } from '@/types/closetType';

const fetchPostPet = async (item_name: PostItemType) => {
  const itemName = JSON.stringify(item_name);
  const response = await axios.post(`pets/closet/select-pet/`, itemName);
  console.log(response.data);
  return response.data;
};

export const usePostPet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ item_name }: PostItemType) => fetchPostPet({ item_name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['petList'] });
    },
  });
};
