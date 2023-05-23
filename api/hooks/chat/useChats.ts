import { useQuery } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IFetchChatsResponse {
  message: string;
  data: IMyChat[];
}

export interface IMyChat {
  chat_id: string;
  users: string[];
  last_message: string;
  last_message_date: number;
  created_at: number;
  updated_at: number;
  user?: {
    username: string;
    avatar: string;
  };
}

const fetchChatByUserId = async () => {
  const response = await fetcher('/chats');
  return response.data as IFetchChatsResponse;
};

const useChats = () => {
  const chatQuery = useQuery<IFetchChatsResponse, Error>({
    queryKey: ['chats'],
    queryFn: () => fetchChatByUserId(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return { loading: chatQuery.isLoading, chats: chatQuery.data?.data };
};

export { useChats };
