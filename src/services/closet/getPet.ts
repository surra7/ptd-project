import { useQuery } from '@tanstack/react-query';
import { axios } from '../instance';
import { ClosetItemType } from '@/types/closetType';

const fetchGetPet = async () => {
  const response = await axios.get<ClosetItemType[]>(`pets/closet/pets/`);
  console.log(response.data);
  return response.data;
};

export const useGetPet = () => {
  return useQuery({
    queryKey: ['petList'],
    queryFn: () => fetchGetPet(),
    staleTime: 0,
  });
};
