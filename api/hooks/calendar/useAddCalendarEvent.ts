import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../../fetcher';

interface IAddCalendarEventResponse {
  message: string;
}

export interface IAddCalendarEventRequest {
  description: string;
  timestamp: number;
  eventType: EventTypes;
}

export enum EventTypes {
  PERSONAL = 'personal',
  WORK = 'work',
  EXAMS = 'exams',
  TASKS = 'tasks',
  UNIVERSITY = 'university',
}

const addCalendarEvent = async (data: IAddCalendarEventRequest) => {
  const { description, timestamp, eventType } = data;
  const response = await fetcher('/calendar', {
    method: 'POST',
    body: JSON.stringify({
      description,
      timestamp,
      event_type: eventType,
    }),
  });
  return response.data as IAddCalendarEventResponse;
};

const useAddCalendarEvent = () => {
  const queryClient = useQueryClient();
  const addCalendarEventMutation = useMutation<
    IAddCalendarEventResponse,
    Error,
    IAddCalendarEventRequest
  >((data) => addCalendarEvent(data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['calendar']);
    },
  });

  const handleAddCalendarEvent = async (data: IAddCalendarEventRequest) => {
    try {
      await addCalendarEventMutation.mutateAsync(data);
    } catch (error) {
      console.log('Error al crear evento:', error);
      throw error;
    }
  };

  return {
    handleAddCalendarEvent,
    isLoading: addCalendarEventMutation.isLoading,
  };
};

export default useAddCalendarEvent;
