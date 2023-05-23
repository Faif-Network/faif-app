import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

interface ICreateChatRequest {
  receiver_id: string;
}

interface ICreateChatResponse {
  message: string;
  data: IChat;
}

interface IChat {
  chat_id: string;
  users: string[];
  messages: {
    sender: string;
    receiver: string;
    message: string;
    created_at: number;
  }[];
  created_at: number;
}

const createChat = async (
  receiver_id: string,
): Promise<ICreateChatResponse> => {
  const response = await fetcher('/chats', {
    method: 'POST',
    body: JSON.stringify({
      receiver: receiver_id,
    }),
  });

  return response.data as ICreateChatResponse;
};

const useCreateChat = () => {
  const queryClient = useQueryClient();

  const createChatMutation = useMutation<
    ICreateChatResponse,
    Error,
    ICreateChatRequest
  >((request) => createChat(request.receiver_id), {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(['chats']);
    },
  });

  const handleCreateChat = async (receiver_id: string) => {
    try {
      const res = await createChatMutation.mutateAsync({ receiver_id });
      return res?.data;
    } catch (error) {
      console.log('Error al crear chat:', error);
      throw error;
    }
  };

  return { handleCreateChat, isLoading: createChatMutation.isLoading };
};

export default useCreateChat;
