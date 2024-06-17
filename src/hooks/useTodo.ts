import { axios } from '@/services/instance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type TodoItem = {
  id: number;
  created_at: string;
  updated_at: string;
  todo_item: string;
  done: boolean;
  post: 3;
};

const fetchTodos = async () => {
  const response = await axios.get<TodoItem[]>('posts/todo/3');

  return response.data;
};
export const useTodos = () => {
  return useQuery({
    queryKey: ['todolist', 3],
    queryFn: () => fetchTodos(),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => axios.delete(`posts/todo/3/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist', 3] });
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: TodoItem) => axios.post('posts/todo/3', content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist', 3] });
    },
  });
};
