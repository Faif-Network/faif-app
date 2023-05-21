import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../redux/slices/authSlice';
import fetcher from '../../fetcher';

export interface IFetchPublicProfileResponse {
  message: string;
  data: IPublicProfile;
}

export interface IPublicProfile {
  id: string;
  username: string;
  avatar: string;
  name: string;
  last_name: string;
  biography: string;
}

const fetchPublicProfile = async (): Promise<IFetchPublicProfileResponse> => {
  const response = await fetcher(`/users`);
  return response.data as IFetchPublicProfileResponse;
};

const useMe = () => {
  const token = useSelector(selectToken);

  const publicProfileQuery = useQuery<IFetchPublicProfileResponse, Error>({
    queryKey: ['privateProfile'],
    queryFn: () => fetchPublicProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  return {
    loading: publicProfileQuery.isLoading,
    publicProfile: publicProfileQuery.data?.data, // Accede a la propiedad data dentro de publicProfileQuery.data
  };
};

export { useMe };
