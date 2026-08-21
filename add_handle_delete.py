import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = """  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();"""

replacement = """  const handleDeleteEvent = (eventToDelete: CalendarEvent) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้?')) {
      if (eventToDelete.id.startsWith('proj_')) {
         const pid = eventToDelete.id.replace('proj_', '');
         setProjects?.(projects.map(p => p.id === pid ? {...p, startDate: '', endDate: '', startTime: ''} : p));
      } else if (eventToDelete.id.startsWith('session_')) {
         const sid = eventToDelete.id.replace('session_', '');
         setSessions?.(sessions.filter(s => s.id !== sid));
      } else {
         if (setEvents) setEvents(events.filter(e => e.id !== eventToDelete.id));
      }
      if (selectedProject?.id === eventToDelete.id) setSelectedProject(null);
      if (editingEvent?.id === eventToDelete.id) {
        setEditingEvent(null);
        setAddingToDate(null);
      }
    }
  };

  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/CalendarView.tsx', 'w') as f:
        f.write(content)
    print("Patched handleDeleteEvent successfully")
else:
    print("handleDeleteEvent target not found")
