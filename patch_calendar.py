import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

# Replace variables using events for rendering with allEvents
content = content.replace("events.some(e => {", "allEvents.some(e => {")
content = content.replace("const dayEvents = events.filter(e => {", "const dayEvents = allEvents.filter(e => {")
content = content.replace("const currentMonthEvents = events.filter(e => {", "const currentMonthEvents = allEvents.filter(e => {")

with open('src/views/CalendarView.tsx', 'w') as f:
    f.write(content)

print("Patched successfully")
