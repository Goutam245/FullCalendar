import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewType } from '@/types/calendar';

interface CalendarToolbarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
  onNewEvent: () => void;
}

const CalendarToolbar = ({
  currentView,
  onViewChange,
  currentDate,
  onNavigate,
  onNewEvent
}: CalendarToolbarProps) => {
  const formatTitle = () => {
    if (currentView === 'day') {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else if (currentView === 'week') {
      return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } else if (currentView === 'month') {
      return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } else {
      return currentDate.getFullYear().toString();
    }
  };

  return (
    <div className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">FullCalendar</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('today')}
              className="min-w-[100px]"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold">{formatTitle()}</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-secondary rounded-lg p-1">
            {(['day', 'week', 'month', 'year'] as ViewType[]).map((view) => (
              <Button
                key={view}
                variant={currentView === view ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange(view)}
                className="capitalize"
              >
                {view}
              </Button>
            ))}
          </div>
          <Button onClick={onNewEvent} className="gap-2">
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
