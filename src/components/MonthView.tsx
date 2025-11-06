import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '@/types/calendar';
import TwoMonthNavigator from './TwoMonthNavigator';
import { useRef, useEffect } from 'react';

interface MonthViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  showNavigator?: boolean;
  showWeekNumbers?: boolean;
  showWeekdayInitials?: boolean;
}

const MonthView = ({
  events,
  selectedDate,
  onDateSelect,
  onEventClick,
  onDateClick,
  showNavigator = false,
  showWeekNumbers = false,
  showWeekdayInitials = true
}: MonthViewProps) => {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)] p-4">
      <div className={showNavigator ? 'w-2/3' : 'w-full'}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          events={events.map(e => ({
            id: e.id,
            title: e.title,
            start: e.start,
            end: e.end,
            backgroundColor: e.color,
            borderColor: e.color,
          }))}
          eventClick={(info) => {
            const event = events.find(e => e.id === info.event.id);
            if (event) onEventClick(event);
          }}
          dateClick={(info) => onDateClick(new Date(info.dateStr))}
          height="100%"
          editable
          selectable
        />
      </div>

      {showNavigator && (
        <div className="w-1/3">
          <TwoMonthNavigator
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              onDateSelect(date);
              if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.gotoDate(date);
              }
            }}
            showWeekNumbers={showWeekNumbers}
            showWeekdayInitials={showWeekdayInitials}
            currentMonth={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default MonthView;
