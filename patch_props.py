import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = """interface CalendarViewProps {
  events: CalendarEvent[];
  setEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  projects?: ProjectItem[];
  sessions?: SessionItem[];
}"""

replacement = """interface CalendarViewProps {
  events: CalendarEvent[];
  setEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  projects?: ProjectItem[];
  sessions?: SessionItem[];
  setProjects?: any;
  setSessions?: any;
}"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/CalendarView.tsx', 'w') as f:
        f.write(content)
    print("Patched Props successfully")
else:
    print("Props target not found")
