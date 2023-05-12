import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface IRegisterResponse {
  token: string;
}

const register = async (
  request: IRegisterRequest,
): Promise<IRegisterResponse> => {
  const response = await fetcher('/auth/register', {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return response.data as IRegisterResponse;
};

const useRegister = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation<
    IRegisterResponse,
    Error,
    IRegisterRequest
  >((request) => register(request), {
    onSuccess: async (data) => {
      // Save the token in AsyncStorage
      await AsyncStorage.setItem('token', data.token);
      await queryClient.invalidateQueries();
    },
  });

  const handleRegister = async (data: IRegisterRequest) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al registrarse:', error);
      throw error;
    }
  };

  return { handleRegister, isLoading: registerMutation.isLoading };
};

export default useRegister;
