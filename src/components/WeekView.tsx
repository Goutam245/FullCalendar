import { CalendarEvent } from '@/types/calendar';
import TwoMonthNavigator from './TwoMonthNavigator';

interface WeekViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  showNavigator?: boolean;
  showWeekNumbers?: boolean;
  showWeekdayInitials?: boolean;
}

const WeekView = ({
  events,
  selectedDate,
  onDateSelect,
  onEventClick,
  showNavigator = true,
  showWeekNumbers = false,
  showWeekdayInitials = true
}: WeekViewProps) => {
  const getWeekDays = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)] p-4">
      <div className={showNavigator ? 'w-2/3' : 'w-full'}>
        <div className="bg-card border rounded-lg h-full overflow-hidden">
          <div className="grid grid-cols-7 border-b">
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className={`text-center py-4 border-r last:border-r-0 ${
                  isToday(day) ? 'bg-primary/10' : ''
                }`}
              >
                <div className="text-xs text-muted-foreground font-medium mb-1">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-2xl font-bold ${isToday(day) ? 'text-primary' : ''}`}>
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 h-[calc(100%-80px)]">
            {weekDays.map((day, idx) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div
                  key={idx}
                  className="border-r last:border-r-0 p-2 overflow-y-auto"
                  onClick={() => onDateSelect(day)}
                >
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className="w-full text-left p-2 rounded text-xs hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: event.color, color: 'white' }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        {event.category && (
                          <div className="text-xs opacity-90">{event.category}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showNavigator && (
        <div className="w-1/3">
          <TwoMonthNavigator
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            showWeekNumbers={showWeekNumbers}
            showWeekdayInitials={showWeekdayInitials}
            currentMonth={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default WeekView;
