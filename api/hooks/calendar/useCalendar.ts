import { useQuery } from '@tanstack/react-query';
import { AgendaSchedule } from 'react-native-calendars';
import fetcher from '../../fetcher';

interface IFetchCalendarResponse {
  message: string;
  data: AgendaSchedule;
}

const fetchCalendar = async () => {
  const response = await fetcher('/calendar', {
    method: 'GET',
  });
  return response.data as IFetchCalendarResponse;
};

const useCalendar = () => {
  const calendarQuery = useQuery<IFetchCalendarResponse, Error>({
    queryKey: ['calendar'],
    queryFn: () => fetchCalendar(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return {
    calendar: calendarQuery.data?.data,
    isLoading: calendarQuery.isLoading,
  };
};

export default useCalendar;
