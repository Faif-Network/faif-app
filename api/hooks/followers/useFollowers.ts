import { useQuery } from '@tanstack/react-query';
import { queryBuilder } from '../../../utils/queryBuilder';
import fetcher from '../../fetcher';

export interface IFetchFollowersResponse {
  message: string;
  data: {
    num_followers: number;
    num_following: number;
    is_following: boolean;
  };
}

export interface IFetchFollowersRequest {
  user_id?: string;
}

const fetchFollowers = async (
  options?: IFetchFollowersRequest,
): Promise<IFetchFollowersResponse> => {
  const url = '/followers';
  const queries = [];
  if (options) {
    if (options.user_id) {
      queries.push(`filter[user_id]=${options.user_id}`);
    }
  }
  const response = await fetcher(`${url}${queryBuilder(queries)}`);
  return response.data as IFetchFollowersResponse;
};

const useFollowers = (options?: IFetchFollowersRequest) => {
  const followersQuery = useQuery<IFetchFollowersResponse, Error>({
    queryKey: ['followers'],
    queryFn: () => fetchFollowers(options),
    staleTime: 1000 * 60 * 1, // 1 minuto
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 5,
  });

  return { loading: followersQuery.isLoading, followers: followersQuery.data };
};

export { useFollowers };
