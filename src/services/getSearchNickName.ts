import { axios } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchNicknameList = async (nickname: string) => {
  const response = await axios.get(`guestbook/${nickname}`);
  console.log(response.data);
  return response.data;
};

export const useGetSearchNickName = (nickname: string) => {
  return useQuery({
    queryKey: ['nicknameList', nickname],
    queryFn: () => fetchNicknameList(nickname),
    enabled: false,
  });
};
