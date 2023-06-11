import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IUpdateProfileRequest {
  username?: string;
  biography?: string;
  avatar?: string;
  name?: string;
  last_name?: string;
  community_slug?: string;
}

interface IUpdateProfileResponse {
  message: string;
}

const updateProfile = async (
  request: IUpdateProfileRequest,
): Promise<IUpdateProfileResponse> => {
  const response = await fetcher('/users', {
    method: 'PUT',
    body: JSON.stringify(request),
  });

  return response.data as IUpdateProfileResponse;
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation<
    IUpdateProfileResponse,
    Error,
    IUpdateProfileRequest
  >((request) => updateProfile(request), {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });

  const handleUpdateProfile = async (data: IUpdateProfileRequest) => {
    try {
      await updateProfileMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al actualizar perfil:', error);
      throw error;
    }
  };

  return { handleUpdateProfile, isLoading: updateProfileMutation.isLoading };
};

export default useUpdateProfile;
