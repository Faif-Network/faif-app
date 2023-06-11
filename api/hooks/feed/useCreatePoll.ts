import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface ICreatePollRequest {
  question: string;
  options: string[];
  attachment_type?: string;
}

export interface ICreatePollResponse {
  data: {
    message: string;
    poll: {
      id: string;
      attachment_url?: string;
    };
  };
}

const createPoll = async (
  request: ICreatePollRequest,
): Promise<ICreatePollResponse> => {
  const response = await fetcher('/feed/polls', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return response.data as ICreatePollResponse;
};

const useCreatePoll = () => {
  const queryClient = useQueryClient();
  const createPollMutation = useMutation<
    ICreatePollResponse,
    Error,
    ICreatePollRequest
  >((request) => createPoll(request), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['feed']);
    },
  });

  const handleCreatePoll = async (data: ICreatePollRequest) => {
    try {
      return await createPollMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al crear la encuesta:', error);
      throw error;
    }
  };

  return { handleCreatePoll, isLoading: createPollMutation.isLoading };
};

export default useCreatePoll;
