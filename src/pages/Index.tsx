import { useState, useEffect } from 'react';
import { CalendarEvent, CalendarSettings, ViewType } from '@/types/calendar';
import CalendarToolbar from '@/components/CalendarToolbar';
import DayView from '@/components/DayView';
import WeekView from '@/components/WeekView';
import MonthView from '@/components/MonthView';
import YearView from '@/components/YearView';
import EventPopupModal from '@/components/EventPopupModal';
import SettingsPanel from '@/components/SettingsPanel';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2025, 10, 6, 10, 0),
      end: new Date(2025, 10, 6, 11, 0),
      color: '#3B82F6',
      category: 'Meeting',
      description: 'Weekly team sync'
    },
    {
      id: '2',
      title: 'Client Call',
      start: new Date(2025, 10, 6, 14, 0),
      end: new Date(2025, 10, 6, 15, 0),
      color: '#10B981',
      category: 'Call',
      description: 'Project discussion'
    },
    {
      id: '3',
      title: 'Code Review',
      start: new Date(2025, 10, 7, 15, 0),
      end: new Date(2025, 10, 7, 16, 30),
      color: '#F59E0B',
      category: 'Development',
    }
  ]);

  const [settings, setSettings] = useState<CalendarSettings>({
    loggedin: true,
    uid: '1',
    weeknumbers: false,
    weekdayinitials: true,
    daynavigator: true,
    weeknavigator: true,
    monthnavigator: false,
    yearnavigator: false
  });

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEventDate, setNewEventDate] = useState<Date | undefined>();

  useEffect(() => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved && settings.loggedin) {
      setEvents(JSON.parse(saved, (key, value) => {
        if (key === 'start' || key === 'end') {
          return new Date(value);
        }
        return value;
      }));
    }
  }, [settings.loggedin]);

  useEffect(() => {
    if (settings.loggedin) {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    }
  }, [events, settings.loggedin]);

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(selectedDate);
    
    if (direction === 'today') {
      setSelectedDate(new Date());
    } else if (direction === 'prev') {
      if (currentView === 'day') {
        newDate.setDate(newDate.getDate() - 1);
      } else if (currentView === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      } else if (currentView === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (currentView === 'year') {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
      setSelectedDate(newDate);
    } else if (direction === 'next') {
      if (currentView === 'day') {
        newDate.setDate(newDate.getDate() + 1);
      } else if (currentView === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      } else if (currentView === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (currentView === 'year') {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      setSelectedDate(newDate);
    }
  };

  const handleNewEvent = () => {
    setSelectedEvent(null);
    setNewEventDate(selectedDate);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setNewEventDate(undefined);
    setIsEventModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setNewEventDate(date);
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id ? { ...e, ...eventData } as CalendarEvent : e
      ));
      toast({
        title: 'Event Updated',
        description: 'Your event has been updated successfully.'
      });
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventData.title || '',
        start: eventData.start || newEventDate || new Date(),
        end: eventData.end || new Date((eventData.start || newEventDate || new Date()).getTime() + 3600000),
        color: eventData.color || '#3B82F6',
        category: eventData.category,
        description: eventData.description
      };
      setEvents([...events, newEvent]);
      toast({
        title: 'Event Created',
        description: 'Your event has been created successfully.'
      });
    }
  };

  const handleMonthSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentView('month');
  };

  const renderView = () => {
    const commonProps = {
      events,
      selectedDate,
      onDateSelect: setSelectedDate,
      onEventClick: handleEventClick,
    };

    switch (currentView) {
      case 'day':
        return (
          <DayView
            {...commonProps}
            onDateClick={handleDateClick}
            showNavigator={settings.daynavigator}
            showWeekNumbers={settings.weeknumbers}
            showWeekdayInitials={settings.weekdayinitials}
          />
        );
      case 'week':
        return (
          <WeekView
            {...commonProps}
            showNavigator={settings.weeknavigator}
            showWeekNumbers={settings.weeknumbers}
            showWeekdayInitials={settings.weekdayinitials}
          />
        );
      case 'month':
        return (
          <MonthView
            {...commonProps}
            onDateClick={handleDateClick}
            showNavigator={settings.monthnavigator}
            showWeekNumbers={settings.weeknumbers}
            showWeekdayInitials={settings.weekdayinitials}
          />
        );
      case 'year':
        return (
          <YearView
            {...commonProps}
            onMonthSelect={handleMonthSelect}
            showNavigator={settings.yearnavigator}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between px-6 py-2 border-b bg-card">
        <div className="text-sm text-muted-foreground">
          User: {settings.uid} | {settings.loggedin ? 'Logged In' : 'Guest Mode'}
        </div>
        <SettingsPanel settings={settings} onSettingsChange={setSettings} />
      </div>
      
      <CalendarToolbar
        currentView={currentView}
        onViewChange={setCurrentView}
        currentDate={selectedDate}
        onNavigate={handleNavigate}
        onNewEvent={handleNewEvent}
      />
      
      {renderView()}

      <EventPopupModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        event={selectedEvent}
        defaultStart={newEventDate}
        defaultEnd={newEventDate ? new Date(newEventDate.getTime() + 3600000) : undefined}
      />
    </div>
  );
};

export default Index;
