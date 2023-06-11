import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

interface IDeleteCommentResponse {
  message: string;
}

interface IDeleteCommentRequest {
  postId: string;
  commentId: string;
}

const deleteComment = async (
  data: IDeleteCommentRequest,
): Promise<IDeleteCommentResponse> => {
  const { data: responseData } = await fetcher(
    `/feed/posts/${data.postId}/comments/${data.commentId}`,
    {
      method: 'DELETE',
    },
  );
  return responseData as IDeleteCommentResponse;
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation<
    IDeleteCommentResponse,
    Error,
    IDeleteCommentRequest
  >(['comments'], (data) => deleteComment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', 'feed']);
    },
  });

  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {
      deleteCommentMutation.mutate({ postId, commentId });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { loading: deleteCommentMutation.isLoading, handleDeleteComment };
};

export { useDeleteComment };
