import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = """  const allEvents = useMemo(() => {
    const projectEvents: CalendarEvent[] = projects
      .filter(p => p.startDate)
      .map(p => ({
        id: `proj_${p.id}`,
        name: p.name,
        date: p.startDate,
        endDate: p.endDate || '',
        startTime: p.startTime || '00:00',
        location: p.location || '',
        description: `กิจกรรมจากหน้าจัดการโครงการ`,
        category: 'project' as any,
        isProjectEvent: true
      }));
    return [...events, ...projectEvents];
  }, [events, projects]);"""

replacement = """  const allEvents = useMemo(() => {
    const projectEvents: CalendarEvent[] = projects
      .filter(p => p.startDate)
      .map(p => ({
        id: `proj_${p.id}`,
        name: p.name,
        date: p.startDate,
        endDate: p.endDate || '',
        startTime: p.startTime || '00:00',
        location: p.location || '',
        description: `วันเริ่ม/สิ้นสุดโครงการ`,
        category: 'project' as any,
        isProjectEvent: true
      }));

    const sessionEvents: CalendarEvent[] = sessions
      .filter(s => s.date || (projects.find(p => p.id === s.projectId)?.startDate))
      .map(s => {
        const p = projects.find(proj => proj.id === s.projectId);
        return {
          id: `session_${s.id}`,
          name: s.title,
          date: s.date || p?.startDate || '',
          startTime: s.time || '00:00',
          location: s.room || p?.location || '',
          description: `กำหนดการ: ${s.tag} (โครงการ: ${p?.name || ''})`,
          category: 'project' as any,
          isProjectEvent: true
        };
      });

    return [...events, ...projectEvents, ...sessionEvents];
  }, [events, projects, sessions]);"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/CalendarView.tsx', 'w') as f:
        f.write(content)
    print("Patched allEvents successfully")
else:
    print("allEvents target not found")
