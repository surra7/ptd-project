import { axios } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchStreak = async () => {
  const response = await axios.get<{ streak: number }>(`posts/calendar`);
  return response.data;
};

export const useGetStreak = () => {
  return useQuery({
    queryKey: ['streak'],
    queryFn: async () => await fetchStreak(),
  });
};
