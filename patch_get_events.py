import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = """  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => {"""

replacement = """  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter(e => {"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/CalendarView.tsx', 'w') as f:
        f.write(content)
    print("Patched getEventsForDate successfully")
else:
    print("getEventsForDate target not found")
