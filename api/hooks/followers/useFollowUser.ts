import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IFetchFollowUserRequest {
  user_id: string;
}

const fetchFollowUser = async (
  options: IFetchFollowUserRequest,
): Promise<void> => {
  const url = '/followers';
  await fetcher(url, {
    method: 'POST',
    body: JSON.stringify({
      follower_id: options,
    }),
  });
};

const useFollowUser = () => {
  const queryClient = useQueryClient();
  const followUserMutation = useMutation<void, Error, IFetchFollowUserRequest>(
    (options) => fetchFollowUser(options),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['followers']);
      },
    },
  );

  const handleFollowUser = async (data: IFetchFollowUserRequest) => {
    try {
      return await followUserMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al seguir al usuario:', error);
      throw error;
    }
  };

  return { handleFollowUser, isLoading: followUserMutation.isLoading };
};

export default useFollowUser;
