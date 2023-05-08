import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetcher from '../../fetcher'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
}

const login = async (request: ILoginRequest): Promise<ILoginResponse> => {
  const response = await fetcher('/auth/login', {
    method: 'POST',
    body: JSON.stringify(request),
  })

  return response.data as ILoginResponse
}

const useLogin = () => {
  const queryClient = useQueryClient()

  const loginMutation = useMutation<ILoginResponse, Error, ILoginRequest>(
    (request) => login(request),
    {
      onSuccess: async (data) => {
        // Guardamos el token en el local storage
        await AsyncStorage.setItem('token', data.token)
      },
    }
  )

  const handleLogin = async (data: ILoginRequest) => {
    try {
      await loginMutation.mutateAsync(data)
    } catch (error) {
      console.log('Error al iniciar sesión:', error)
      throw error
    }
  }

  return { handleLogin, isLoading: loginMutation.isLoading }
}

export default useLogin
