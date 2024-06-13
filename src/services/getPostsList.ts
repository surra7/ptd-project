import { AxiosError } from 'axios';
import { calendarClient } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchPostList = async (userId: number | undefined) => {
  try {
    const response = await calendarClient.get(`/posts/2`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error Response:', axiosError.response.data);
      console.error('Status:', axiosError.response.status);
      console.error('Headers:', axiosError.response.headers);
    } else if (axiosError.request) {
      console.error('Error Request:', axiosError.request);
    } else {
      console.error('Error Message:', axiosError.message);
    }
  }
};

export const getPostsList = (userId: number | undefined) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['postsList', userId],
    queryFn: () => fetchPostList(userId),
  });
  return { data, isLoading, error, refetch };
};
