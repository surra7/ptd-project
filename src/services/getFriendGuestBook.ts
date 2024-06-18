import { GuestBookListType } from '@/types/guestBookType';
import { axios } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchFriendGuestBook = async (user_id: number | undefined) => {
  const response = await axios.get<GuestBookListType[]>(`guestbook/comments/${user_id}`);
  console.log(response.data);
  return response.data;
};

export const useGetFriendGuestBook = (user_id: number | undefined) => {
  return useQuery({
    queryKey: ['guestBook', user_id],
    queryFn: () => fetchFriendGuestBook(user_id),
  });
};
