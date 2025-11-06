import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TwoMonthNavigatorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  showWeekNumbers?: boolean;
  showWeekdayInitials?: boolean;
  currentMonth?: Date;
  onMonthChange?: (month: Date) => void;
}

const TwoMonthNavigator = ({
  selectedDate,
  onDateSelect,
  showWeekNumbers = false,
  showWeekdayInitials = true,
  currentMonth,
  onMonthChange
}: TwoMonthNavigatorProps) => {
  const [displayMonth, setDisplayMonth] = useState(currentMonth || selectedDate);

  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { year, month, daysInMonth, startingDayOfWeek };
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const renderMonth = (monthOffset: number) => {
    const date = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + monthOffset, 1);
    const { year, month, daysInMonth, startingDayOfWeek } = getMonthData(date);
    const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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

    const isSelected = (day: number) => {
      return (
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      );
    };

    const isToday = (day: number) => {
      const today = new Date();
      return (
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year
      );
    };

    return (
      <div className="flex-1">
        <div className="text-center mb-2 font-semibold text-sm">{monthName}</div>
        {showWeekdayInitials && (
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={idx} className="text-center text-xs text-muted-foreground font-medium">
                {day}
              </div>
            ))}
          </div>
        )}
        <div className="space-y-0.5">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex gap-0.5">
              {showWeekNumbers && (
                <div className="w-5 text-xs text-muted-foreground flex items-center justify-center">
                  {week[0] !== null && getWeekNumber(new Date(year, month, week[0]))}
                </div>
              )}
              {week.map((day, dayIdx) => (
                <button
                  key={dayIdx}
                  disabled={day === null}
                  onClick={() => day && onDateSelect(new Date(year, month, day))}
                  className={`
                    flex-1 aspect-square flex items-center justify-center text-xs
                    transition-colors rounded
                    ${day === null ? 'invisible' : ''}
                    ${isSelected(day as number) ? 'bg-primary text-primary-foreground font-bold' : ''}
                    ${isToday(day as number) && !isSelected(day as number) ? 'border border-primary' : ''}
                    ${day !== null && !isSelected(day as number) ? 'hover:bg-accent/10' : ''}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + direction, 1);
    setDisplayMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
          className="h-6 w-6"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
          className="h-6 w-6"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-4">
        {renderMonth(0)}
        {renderMonth(1)}
      </div>
    </div>
  );
};

export default TwoMonthNavigator;
