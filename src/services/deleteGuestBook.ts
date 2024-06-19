import { DeleteId } from '@/types/guestBookType';
import { axios } from './instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fetchDeleteGuestBook = async (comment_id: DeleteId) => {
  console.log(comment_id);
  const commentId = JSON.stringify(comment_id);
  const response = await axios.post(`guestbook/comments/delete/`, commentId);
  console.log(response.data);
  return response.data;
};

export const useDeleteGuestBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ comment_id }: DeleteId) => fetchDeleteGuestBook({ comment_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestBook'] });
    },
  });
};
