import { CalendarEvent } from '@/types/calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YearViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthSelect: (date: Date) => void;
  showNavigator?: boolean;
}

const YearView = ({
  events,
  selectedDate,
  onDateSelect,
  onMonthSelect,
  showNavigator = false
}: YearViewProps) => {
  const year = selectedDate.getFullYear();

  const getMonthData = (monthIndex: number) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsCountForDay = (monthIndex: number, day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === monthIndex &&
        eventDate.getFullYear() === year
      );
    }).length;
  };

  const renderMonth = (monthIndex: number) => {
    const { daysInMonth, startingDayOfWeek } = getMonthData(monthIndex);
    const monthName = new Date(year, monthIndex).toLocaleDateString('en-US', { month: 'short' });

    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = Array(startingDayOfWeek).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    const isToday = (day: number) => {
      const today = new Date();
      return (
        today.getDate() === day &&
        today.getMonth() === monthIndex &&
        today.getFullYear() === year
      );
    };

    const isSelected = (day: number) => {
      return (
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === monthIndex &&
        selectedDate.getFullYear() === year
      );
    };

    return (
      <div 
        className="bg-card rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onMonthSelect(new Date(year, monthIndex, 1))}
      >
        <div className="text-center font-semibold text-sm mb-2">{monthName}</div>
        <div className="grid grid-cols-7 gap-0.5 text-xs">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div key={idx} className="text-center text-muted-foreground font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-0.5 mt-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 gap-0.5">
              {week.map((day, dayIdx) => {
                const eventsCount = day ? getEventsCountForDay(monthIndex, day) : 0;
                return (
                  <button
                    key={dayIdx}
                    disabled={day === null}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (day) onDateSelect(new Date(year, monthIndex, day));
                    }}
                    className={`
                      aspect-square flex items-center justify-center text-xs relative
                      transition-colors rounded
                      ${day === null ? 'invisible' : ''}
                      ${isSelected(day as number) ? 'bg-primary text-primary-foreground font-bold' : ''}
                      ${isToday(day as number) && !isSelected(day as number) ? 'border border-primary' : ''}
                      ${day !== null && !isSelected(day as number) ? 'hover:bg-accent/10' : ''}
                    `}
                  >
                    {day}
                    {eventsCount > 0 && (
                      <span className="absolute bottom-0 right-0 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-120px)] p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
        </div>
      </div>
    </div>
  );
};

export default YearView;
