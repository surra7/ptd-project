import { GuestBookListType } from '@/types/guestBookType';
import { axios } from './instance';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/atoms/atoms';

const fetchGuestBook = async () => {
  const response = await axios.get<GuestBookListType[]>(`guestbook/`);
  console.log(response.data);
  return response.data;
};

export const useGetGuestBook = (user: User | null) => {
  return useQuery({
    queryKey: ['guestBook', user],
    queryFn: () => fetchGuestBook(),
  });
};
