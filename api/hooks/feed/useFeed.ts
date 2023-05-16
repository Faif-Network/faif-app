import { useQuery } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IFetchFeedResponse {
  message: string;
  data: IPost[];
}

export interface IPost {
  id: string;
  user_id: string;
  content: string;
  attachment: string;
  num_likes: number;
  num_comments: number;
  created_at: number;
  user?: {
    username: string;
    avatar: string;
  };
}

const fetchFeed = async (): Promise<IFetchFeedResponse> => {
  const response = await fetcher('/feed/posts?populate=[user]');
  return response.data as IFetchFeedResponse;
};

const useFeed = () => {
  const feedQuery = useQuery<IFetchFeedResponse, Error>({
    queryKey: ['feed'],
    queryFn: () => fetchFeed(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return { loading: feedQuery.isLoading, feed: feedQuery.data };
};

export { useFeed };
