import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

const createLike = async (postId: string) => {
  const { data } = await fetcher(`/feed/posts/${postId}/likes`, {
    method: 'POST',
  });
  return data;
};

const useCreateLike = (postId: string) => {
  const queryClient = useQueryClient();
  const createLikeMutation = useMutation(createLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['feed']);
    },
  });

  const handleCreateLike = async () => {
    try {
      await createLikeMutation.mutateAsync(postId);
    } catch (error) {
      console.log('Error al crear el like:', error);
      throw error;
    }
  };

  return { handleCreateLike, loading: createLikeMutation.isLoading };
};

export { useCreateLike };
