import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CalendarSettings } from '@/types/calendar';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onSettingsChange: (settings: CalendarSettings) => void;
}

const SettingsPanel = ({ settings, onSettingsChange }: SettingsPanelProps) => {
  const updateSetting = (key: keyof CalendarSettings, value: boolean | string) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Calendar Settings</SheetTitle>
          <SheetDescription>
            Configure calendar display options
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">2-Month Navigator</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="weeknumbers">Show Week Numbers</Label>
                <Switch
                  id="weeknumbers"
                  checked={settings.weeknumbers}
                  onCheckedChange={(checked) => updateSetting('weeknumbers', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekdayinitials">Show Weekday Initials</Label>
                <Switch
                  id="weekdayinitials"
                  checked={settings.weekdayinitials}
                  onCheckedChange={(checked) => updateSetting('weekdayinitials', checked)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Navigator Visibility</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="daynavigator">Day View Navigator</Label>
                <Switch
                  id="daynavigator"
                  checked={settings.daynavigator}
                  onCheckedChange={(checked) => updateSetting('daynavigator', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weeknavigator">Week View Navigator</Label>
                <Switch
                  id="weeknavigator"
                  checked={settings.weeknavigator}
                  onCheckedChange={(checked) => updateSetting('weeknavigator', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="monthnavigator">Month View Navigator</Label>
                <Switch
                  id="monthnavigator"
                  checked={settings.monthnavigator}
                  onCheckedChange={(checked) => updateSetting('monthnavigator', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="yearnavigator">Year View Navigator</Label>
                <Switch
                  id="yearnavigator"
                  checked={settings.yearnavigator}
                  onCheckedChange={(checked) => updateSetting('yearnavigator', checked)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm">User Simulation</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="loggedin">Logged In</Label>
                <Switch
                  id="loggedin"
                  checked={settings.loggedin}
                  onCheckedChange={(checked) => updateSetting('loggedin', checked)}
                />
              </div>
              <div>
                <Label htmlFor="uid">User ID</Label>
                <input
                  id="uid"
                  type="text"
                  value={settings.uid}
                  onChange={(e) => updateSetting('uid', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsPanel;
