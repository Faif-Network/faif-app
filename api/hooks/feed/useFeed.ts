import { useQuery } from '@tanstack/react-query';
import { queryBuilder } from '../../../utils/queryBuilder';
import fetcher from '../../fetcher';

export interface IFetchFeedResponse {
  message: string;
  data: IPost[];
}

interface IFetchFeedRequest {
  populate?: string;
  filterUser?: string;
}

export interface IPost {
  id: string;
  user_id: string;
  content: string;
  attachment: string;
  num_likes: number;
  num_comments: number;
  created_at: number;
  liked?: boolean;
  user?: {
    username: string;
    avatar: string;
  };
  attachment_type?: string;
}

const fetchFeed = async (
  options?: IFetchFeedRequest,
): Promise<IFetchFeedResponse> => {
  const url = '/feed/posts';
  const queries = [];
  if (options) {
    if (options.populate) {
      queries.push(`populate=${options.populate}`);
    }
    if (options.filterUser) {
      queries.push(`filter[user]=${options.filterUser}`);
    }
  }
  const response = await fetcher(`${url}${queryBuilder(queries)}`);
  return response.data as IFetchFeedResponse;
};

const useFeed = (options?: IFetchFeedRequest) => {
  const feedQuery = useQuery<IFetchFeedResponse, Error>({
    queryKey: ['feed', options],
    queryFn: () => fetchFeed(options),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return { loading: feedQuery.isLoading, feed: feedQuery.data };
};

export { useFeed };
