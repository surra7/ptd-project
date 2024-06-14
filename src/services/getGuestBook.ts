import { axios } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchGuestBook = async (user_id: number) => {
  const response = await axios.get(`guestbook/comments/${user_id}`);
  console.log(response.data);
  return response.data;
};

export const useGetGuestBook = (user_id: number) => {
  return useQuery({
    queryKey: ['guestBook'],
    queryFn: () => fetchGuestBook(user_id),
  });
};
