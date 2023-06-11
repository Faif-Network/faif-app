import { useMutation } from '@tanstack/react-query';
import fetcher from '../../fetcher';

export enum ExplorerTypes {
  ERASMUS = 'erasmus',
  HOUSING = 'housing',
  UNIVERSITY = 'university',
  LEISURE = 'leisure',
}

export interface ICreateExplorerRequest {
  description: string;
  short_description: string;
  attachment?: string;
  start_date?: number;
  explorer_type: ExplorerTypes;
  title: string;
}

export interface ICreateExplorerResponse {
  message: string;
  data: {
    id: string;
    attachment_url: string;
  };
}

const createExplorer = async (
  data: ICreateExplorerRequest,
): Promise<ICreateExplorerResponse> => {
  const url = '/explorer';
  const response = await fetcher(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data as ICreateExplorerResponse;
};

const useCreateExplorer = () => {
  const createExplorerMutation = useMutation<
    ICreateExplorerResponse,
    Error,
    ICreateExplorerRequest
  >((data) => createExplorer(data));

  const handleCreateExplorer = async (data: ICreateExplorerRequest) => {
    try {
      return await createExplorerMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al crear el post:', error);
      throw error;
    }
  };

  return { handleCreateExplorer, isLoading: createExplorerMutation.isLoading };
};

export default useCreateExplorer;
