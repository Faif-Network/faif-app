import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface ICompleteProfileRequest {
  name?: string;
  last_name?: string;
  biography?: string;
  community_slug?: string;
}

interface ICompleteProfileResponse {
  message: string;
}

const completeProfile = async (
  request: ICompleteProfileRequest,
): Promise<ICompleteProfileResponse> => {
  const response = await fetcher('/users', {
    method: 'PUT',
    body: JSON.stringify(request),
  });

  return response.data as ICompleteProfileResponse;
};

const useCompleteProfile = () => {
  const queryClient = useQueryClient();
  const completeProfileMutation = useMutation<
    ICompleteProfileResponse,
    Error,
    ICompleteProfileRequest
  >((request) => completeProfile(request), {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });

  const handleCompleteProfile = async (data: ICompleteProfileRequest) => {
    try {
      await completeProfileMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al completar perfil:', error);
      throw error;
    }
  };

  return {
    handleCompleteProfile,
    isLoading: completeProfileMutation.isLoading,
  };
};

export default useCompleteProfile;
