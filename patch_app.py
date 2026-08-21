import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = "return <CalendarView events={calendarEvents} setEvents={makeFirebaseSetter('calendar_events', calendarEvents)} projects={projects} sessions={sessions} />;"
replacement = "return <CalendarView events={calendarEvents} setEvents={makeFirebaseSetter('calendar_events', calendarEvents)} projects={projects} sessions={sessions} setProjects={makeFirebaseSetter('projects', projects)} setSessions={makeFirebaseSetter('sessions', sessions)} />;"

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Patched App.tsx successfully")
else:
    print("App.tsx target not found")
