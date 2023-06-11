import { useQuery } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IFetchCommentsResponse {
  message: string;
  data: IComment[];
}

export interface IComment {
  id: string;
  post_id: string;
  content: string;
  created_at: number;
  user_id: string;
  user?: {
    username: string;
    avatar: string;
  };
}

const fetchComments = async (
  postId: string,
): Promise<IFetchCommentsResponse> => {
  const { data } = await fetcher(
    `/feed/posts/${postId}/comments?populate=[user]`,
  );
  return data as IFetchCommentsResponse;
};

const useComments = (postId: string) => {
  const commentsQuery = useQuery<IFetchCommentsResponse, Error>(
    ['comments', 'feed'],
    () => fetchComments(postId),
  );

  return { loading: commentsQuery.isLoading, comments: commentsQuery?.data };
};

export { useComments };
