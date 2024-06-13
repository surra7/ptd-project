import { AxiosError } from 'axios';
import { calendarClient } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchStreak = async (userId: number | undefined) => {
  try {
    const response = await calendarClient.get(`/posts/calendar/2`, {
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

export const getStreak = (userId: number | undefined) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['streak', userId],
    queryFn: async () => await fetchStreak(userId),
  });
  return { data, isLoading, error, refetch };
};
