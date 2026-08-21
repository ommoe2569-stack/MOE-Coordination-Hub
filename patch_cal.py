import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = """import { ProjectItem } from '../types';

import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  setEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  projects?: ProjectItem[];
}"""
if target not in content:
    target = """import { ProjectItem } from '../types';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  setEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  projects?: ProjectItem[];
}"""

replacement = """import { ProjectItem, SessionItem } from '../types';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  setEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  projects?: ProjectItem[];
  sessions?: SessionItem[];
}"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/CalendarView.tsx', 'w') as f:
        f.write(content)
    print("Patched Props successfully")
else:
    print("Props target not found")
