import { useQuery } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IFetchChatById {
  chat_id: string;
}

export interface IMessage {
  id: string;
  chat_id: string;
  sender: string;
  receiver: string;
  message: string;
  seen: boolean;
  is_sender: boolean;
  created_at: number;
}

export interface FetchChatByIdResponse {
  message: string;
  data: IMessage[];
}

const fetchChatById = async (
  data: IFetchChatById,
): Promise<FetchChatByIdResponse> => {
  const { chat_id } = data;
  const response = await fetcher(`/chats/${chat_id}/messages`);
  return response.data as FetchChatByIdResponse;
};

const useChatById = (chatId: string) => {
  const chatByIdQuery = useQuery<FetchChatByIdResponse, Error>({
    queryKey: ['chatById'],
    queryFn: () => fetchChatById({ chat_id: chatId }),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return {
    loading: chatByIdQuery.isLoading,
    chat: chatByIdQuery.data?.data,
    refetch: chatByIdQuery.refetch,
  };
};

export { useChatById };
