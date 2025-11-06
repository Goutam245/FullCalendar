import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '@/types/calendar';
import TwoMonthNavigator from './TwoMonthNavigator';
import { useRef, useEffect } from 'react';

const getFruitForDay = (date: Date): string => {
  const fruits = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍑', '🍒', '🥝', '🍍', '🥥', '🥭', '🍏'];
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  return fruits[dayOfYear % fruits.length];
};

interface DayViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  showNavigator?: boolean;
  showWeekNumbers?: boolean;
  showWeekdayInitials?: boolean;
}

const DayView = ({
  events,
  selectedDate,
  onDateSelect,
  onEventClick,
  onDateClick,
  showNavigator = true,
  showWeekNumbers = false,
  showWeekdayInitials = true
}: DayViewProps) => {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date);
    }
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)] p-4">
      <div className={showNavigator ? 'w-1/2' : 'w-full'}>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
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
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          nowIndicator
          editable
          selectable
        />
      </div>
      
      {showNavigator && (
        <div className="w-1/2 flex flex-col gap-4">
          <div className="bg-card rounded-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">{getFruitForDay(selectedDate)}</div>
              <p className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <TwoMonthNavigator
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            showWeekNumbers={showWeekNumbers}
            showWeekdayInitials={showWeekdayInitials}
            currentMonth={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default DayView;
