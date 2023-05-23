import { useQuery } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IFetchPublicProfileResponse {
  message: string;
  data: IPublicProfile;
}

export interface IPublicProfile {
  username: string;
  avatar: string;
  user_id: number;
}

const fetchPublicProfile = async (
  username: string,
): Promise<IFetchPublicProfileResponse> => {
  const response = await fetcher(`/users/${username}`);
  return response.data as IFetchPublicProfileResponse;
};

const usePublicProfile = (username: string) => {
  const publicProfileQuery = useQuery<IFetchPublicProfileResponse, Error>({
    queryKey: ['publicProfile', username],
    queryFn: () => fetchPublicProfile(username),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: !!username,
  });

  return {
    loading: publicProfileQuery.isLoading,
    publicProfile: publicProfileQuery.data,
  };
};

export { usePublicProfile };
