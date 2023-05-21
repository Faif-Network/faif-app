import { useQuery } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IFetchFeedResponse {
  message: string;
  data: IPost[];
}

interface IFetchFeedRequest {
  populate?: string;
  filterUser?: string;
  // Otros filtros que desees agregar
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
}

const fetchFeed = async (
  options?: IFetchFeedRequest,
): Promise<IFetchFeedResponse> => {
  let url = '/feed/posts';
  if (options) {
    const { populate, filterUser } = options;
    if (populate) {
      url += `?populate=${encodeURIComponent(populate)}`;
    }
    if (filterUser) {
      url += `&filter[user]=${encodeURIComponent(filterUser)}`;
    }
    // Agrega aquí otras opciones de filtro si es necesario
  }
  const response = await fetcher(url);
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
