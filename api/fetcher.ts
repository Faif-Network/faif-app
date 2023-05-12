import AsyncStorage from '@react-native-async-storage/async-storage';

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
  body?: BodyInit_ | null;
};

type Response<T> = {
  data: T;
  status: number;
};

type ErrorResponse = {
  message: string;
  status: number;
};

const BASE_URL = 'http://localhost:3000';

async function fetcher<T>(
  url: string,
  options?: RequestOptions,
): Promise<Response<T>> {
  const headers = options?.headers || {
    'Content-Type': 'application/json',
  };

  // Check if a token is available in AsyncStorage
  const token = await AsyncStorage.getItem('token');

  // Add the Authorization header if a token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    method: options?.method || 'GET',
    headers,
    body: options?.body,
  });

  if (!response.ok) {
    const message = await response.json().then((data) => data.message);
    const errorResponse: ErrorResponse = {
      message: message || 'Something went wrong',
      status: response.status,
    };

    if (response.status === 401) {
      errorResponse.message = 'Unauthorized';
      await AsyncStorage.removeItem('token');
    }

    throw errorResponse;
  }

  const data = await response.json();

  return { data, status: response.status };
}

export default fetcher;
