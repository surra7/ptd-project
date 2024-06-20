import { postGuestBookProps } from '@/types/guestBookType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../instance';

const fetchPostGuestBook = async (new_comment: postGuestBookProps) => {
  const commentData = JSON.stringify(new_comment);
  const response = await axios.post(`guestbook/comments/a-create/`, commentData);
  console.log(response.data);
  return response.data;
};

export const usePostGuestBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ content, guestbook_user }: postGuestBookProps) => fetchPostGuestBook({ content, guestbook_user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestBook'] });
    },
  });
};
