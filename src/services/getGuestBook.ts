import { GuestBookListType } from '@/types/guestBookType';
import { axios } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchGuestBook = async () => {
  const response = await axios.get<GuestBookListType[]>(`guestbook/`);
  console.log(response.data);
  return response.data;
};

export const useGetGuestBook = () => {
  return useQuery({
    queryKey: ['guestBook'],
    queryFn: () => fetchGuestBook(),
  });
};
