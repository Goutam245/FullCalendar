# FullCalendar Fusion Studio - React Implementation

A professional React-based calendar application with custom views and advanced event management, implementing all the visual requirements from the FullCalendar customization challenge.

## 🌟 Features

### Custom Views
- **Day View**: Calendar occupying 50% of screen with 2-month navigator on right
- **Week View**: Weekdays aligned vertically with horizontal day boxes
- **Month View**: Standard FullCalendar month grid view
- **Year View**: All 12 months displayed in a clean grid layout

### 2-Month Navigator
- Compact design with date selection
- Toggleable week numbers
- Toggleable weekday initials
- Navigation arrows for month browsing
- Blue highlight for selected dates
- Click any date without auto-advancing months
- Dynamic updates when switching days/months

### Event Management
- Event popup modal with color picker
- 8 preset colors for easy selection
- Category and description support
- Visual event bars with color coding
- Click-to-edit functionality
- Local storage persistence (when logged in)

### Settings Panel
- Toggle week numbers display
- Toggle weekday initials display
- Control navigator visibility per view
- User simulation (logged in/guest mode)
- User ID configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── CalendarToolbar.tsx      # Main navigation and view switcher
│   ├── DayView.tsx               # Custom day view with navigator
│   ├── WeekView.tsx              # Custom week view layout
│   ├── MonthView.tsx             # Standard month grid view
│   ├── YearView.tsx              # 12-month year view
│   ├── TwoMonthNavigator.tsx    # Compact 2-month date picker
│   ├── EventPopupModal.tsx       # Event creation/editing modal
│   ├── SettingsPanel.tsx         # Configuration panel
│   └── ui/                       # Shadcn UI components
├── types/
│   └── calendar.ts               # TypeScript interfaces
├── pages/
│   └── Index.tsx                 # Main calendar page
└── index.css                     # Design system & styles
```

## 🎨 Design System

The application uses a professional blue/teal color scheme defined in `src/index.css`:

- **Primary**: Modern blue for interactive elements
- **Accent**: Teal for highlights and secondary actions
- **Calendar-specific tokens**: Optimized for calendar UI
- Smooth transitions and animations
- Dark mode support

## 💾 Data Persistence

Events are stored in:
- **Local Storage** when `loggedin = true`
- **Session only** when `loggedin = false`

This simulates the PHP `$loggedin` variable from the original requirements.

## ⚙️ Configuration

Access the settings panel via the gear icon in the top-right. Available options:

- **Week Numbers**: Show/hide week numbers in navigator
- **Weekday Initials**: Show/hide weekday initials (M, T, W, T, F, S, S)
- **Navigator Visibility**: Toggle navigator for each view separately
- **User Settings**: Simulate logged in/guest mode and user ID

## 🔄 Converting to PHP

To convert this React implementation to PHP/vanilla JS:

1. **State Management**: Replace React state with PHP session variables and JavaScript objects
2. **Components**: Convert components to PHP functions that echo HTML
3. **Event Handling**: Replace React event handlers with vanilla JS event listeners
4. **Data Storage**: Replace localStorage with MySQL database calls
5. **Settings**: Use `settings.php` file with variables as specified in requirements

Example settings.php structure:
```php
<?php
$loggedin = "true";
$uid = "1";
$weeknumbers = "false";
$weekdayinitials = "true";
$daynavigator = "true";
$weeknavigator = "true";
$monthnavigator = "false";
$yearnavigator = "false";
?>
```

## 📚 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **FullCalendar 6.1.15** - Calendar core
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Vite** - Build tool

## 🎯 Implementation Notes

All visual requirements from the PDF have been implemented:

✅ Day View with 50/50 split layout
✅ 2-month navigator with all features
✅ Dynamic image display area
✅ Week View with vertical weekday layout
✅ Year View with 12-month grid
✅ Event popup with color selection
✅ Settings panel for all PHP variables
✅ Clean, modern, professional design
✅ Responsive and mobile-friendly
✅ SEO optimized meta tags

## 📄 License

This is a demonstration project for the FullCalendar customization challenge.

## 🤝 Support

For questions or issues, please refer to the original requirements document or contact the project maintainer.
