import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

interface ICreateVotePollRequest {
  poll_id: string;
  option: string;
}

interface ICreateVotePollResponse {
  message: string;
  data: {
    vote_id: string;
  };
}

const createVotePoll = async (
  request: ICreateVotePollRequest,
): Promise<ICreateVotePollResponse> => {
  const response = await fetcher(`/feed/polls/${request.poll_id}/votes`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return response.data as ICreateVotePollResponse;
};

const useCreateVotePoll = () => {
  const queryClient = useQueryClient();
  const createVotePollMutation = useMutation<
    ICreateVotePollResponse,
    Error,
    ICreateVotePollRequest
  >((request) => createVotePoll(request), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['feed']);
    },
  });

  const handleCreateVotePoll = async (data: ICreateVotePollRequest) => {
    try {
      return await createVotePollMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al crear el voto:', error);
      throw error;
    }
  };

  return { handleCreateVotePoll, isLoading: createVotePollMutation.isLoading };
};

export default useCreateVotePoll;
