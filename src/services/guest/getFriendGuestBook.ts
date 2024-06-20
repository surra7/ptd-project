import { GuestBookListType } from '@/types/guestBookType';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/atoms/atoms';
import { axios } from '../instance';

const fetchFriendGuestBook = async (user_id: number | undefined) => {
  const response = await axios.get<GuestBookListType[]>(`guestbook/comments/${user_id}`);
  console.log(response.data);
  return response.data;
};

export const useGetFriendGuestBook = (user_id: number | undefined, user: User | null) => {
  return useQuery({
    queryKey: ['guestBook', user_id, user],
    queryFn: () => fetchFriendGuestBook(user_id),
  });
};
