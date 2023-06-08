import { useQuery } from '@tanstack/react-query';
import { queryBuilder } from '../../../utils/queryBuilder';
import fetcher from '../../fetcher';

export interface IFetchExplorerResponse {
  message: string;
  data: IExplorer[];
}

interface IFetchExplorerRequest {
  explorer_type?: string;
}

export interface IExplorer {
  id: string;
  user_id: string;
  title: string;
  description: string;
  short_description: string;
  attachment: string;
  start_date: number;
  explorer_type: string;
}

const fetchExplorer = async (
  options?: IFetchExplorerRequest,
): Promise<IFetchExplorerResponse> => {
  const url = '/explorer';
  const queries = [];
  if (options) {
    if (options.explorer_type) {
      queries.push(`filter[type]=${options.explorer_type}`);
    }
  }
  const response = await fetcher(`${url}${queryBuilder(queries)}`);
  return response.data as IFetchExplorerResponse;
};

const useExplorer = (options?: IFetchExplorerRequest) => {
  const explorerQuery = useQuery<IFetchExplorerResponse, Error>({
    queryKey: ['explorer', options],
    queryFn: () => fetchExplorer(options),
    staleTime: 1000 * 60 * 1, // 1 minuto
    refetchOnWindowFocus: false,
  });

  return { loading: explorerQuery.isLoading, explorer: explorerQuery.data };
};

export { useExplorer };
