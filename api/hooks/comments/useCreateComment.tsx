import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface ICreateCommentRequest {
  content: string;
}

export interface ICreateCommentsResponse {
  message: string;
  data: {
    comment_id: string;
  };
}

const createComment = async (
  postId: string,
  data: ICreateCommentRequest,
): Promise<ICreateCommentsResponse> => {
  const { data: responseData } = await fetcher(
    `/feed/posts/${postId}/comments`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  return responseData as ICreateCommentsResponse;
};

const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation<
    ICreateCommentsResponse,
    Error,
    ICreateCommentRequest
  >(['comments'], (data) => createComment(postId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', 'feed']);
    },
  });

  const handleCreateComment = async (data: ICreateCommentRequest) => {
    try {
      createCommentMutation.mutate(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { loading: createCommentMutation.isLoading, handleCreateComment };
};

export { useCreateComment };
