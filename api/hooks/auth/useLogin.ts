import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setAuthStatusTrue } from '../../../redux/slices/authSlice';
import fetcher from '../../fetcher';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    access_token: string;
  };
}

const login = async (request: ILoginRequest): Promise<ILoginResponse> => {
  const response = await fetcher('/auth/login', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return response.data as ILoginResponse;
};

const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const loginMutation = useMutation<ILoginResponse, Error, ILoginRequest>(
    (request) => login(request),
    {
      onSuccess: async (data) => {
        // Guardamos el token en el local storage
        const token = data.data.access_token;
        await AsyncStorage.setItem('token', token);
        dispatch(setAuthStatusTrue({ token }));
        await queryClient.invalidateQueries();
      },
    },
  );

  const handleLogin = async (data: ILoginRequest) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      throw error;
    }
  };

  return { handleLogin, isLoading: loginMutation.isLoading };
};

export default useLogin;
