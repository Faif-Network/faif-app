export interface IAddCalendarEvent {
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
