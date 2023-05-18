import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export interface ICreatePostRequest {
  content: string;
  attachment?: string;
}

export interface ICreatePostResponse {
  data: {
    message: string;
    post_id: string;
  };
}

const createPost = async (
  request: ICreatePostRequest,
): Promise<ICreatePostResponse> => {
  const response = await fetcher('/feed/posts', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return response.data as ICreatePostResponse;
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const createPostMutation = useMutation<
    ICreatePostResponse,
    Error,
    ICreatePostRequest
  >((request) => createPost(request), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['feed']);
    },
  });

  const handleCreatePost = async (data: ICreatePostRequest) => {
    try {
      await createPostMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al crear el post:', error);
      throw error;
    }
  };

  return { handleCreatePost, isLoading: createPostMutation.isLoading };
};

export default useCreatePost;
