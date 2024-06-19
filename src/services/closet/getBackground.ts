import { useQuery } from '@tanstack/react-query';
import { axios } from '../instance';
import { ClosetItemType } from '@/types/closetType';

const fetchGetBackground = async () => {
  const response = await axios.get<ClosetItemType[]>(`pets/closet/backgrounds/`);
  console.log(response.data);
  return response.data;
};

export const useGetBackground = () => {
  return useQuery({
    queryKey: ['backgroundList'],
    queryFn: () => fetchGetBackground(),
  });
};
