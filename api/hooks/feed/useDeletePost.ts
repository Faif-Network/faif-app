import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface IDeletePostResponse {
  message: string;
}

const deletePost = async (postId: string) => {
  const response = await fetcher(`/feed/posts/${postId}`, {
    method: 'DELETE',
  });

  return response.data as IDeletePostResponse;
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation<IDeletePostResponse, Error, string>(
    (postId) => deletePost(postId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['feed']);
      },
    },
  );

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostMutation.mutateAsync(postId);
    } catch (error) {
      console.log('Error al eliminar el post:', error);
      throw error;
    }
  };

  return { handleDeletePost, isLoading: deletePostMutation.isLoading };
};

export default useDeletePost;
