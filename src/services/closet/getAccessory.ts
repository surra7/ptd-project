import { useQuery } from '@tanstack/react-query';
import { axios } from '../instance';
import { ClosetItemType } from '@/types/closetType';

const fetchGetAccessory = async () => {
  const response = await axios.get<ClosetItemType[]>(`pets/closet/accessories/`);
  console.log(response.data);
  return response.data;
};

export const useGetAccessory = () => {
  return useQuery({
    queryKey: ['accessoryList'],
    queryFn: () => fetchGetAccessory(),
  });
};
