export interface CalendarSettings {
  loggedin: boolean;
  uid: string;
  weeknumbers: boolean;
  weekdayinitials: boolean;
  daynavigator: boolean;
  weeknavigator: boolean;
  monthnavigator: boolean;
  yearnavigator: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  category?: string;
  description?: string;
}

export type ViewType = 'day' | 'week' | 'month' | 'year';
