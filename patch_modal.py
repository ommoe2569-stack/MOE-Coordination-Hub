import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = "{setEvents && ("
replacement = "{setEvents && !selectedProject.isProjectEvent && ("
content = content.replace(target, replacement)

with open('src/views/CalendarView.tsx', 'w') as f:
    f.write(content)
print("Patched successfully")
