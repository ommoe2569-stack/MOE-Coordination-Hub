import sys

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = """              <div className="flex items-center gap-2">
                {setEvents && !selectedProject.isProjectEvent && (
                  <>
                    <button 
                      onClick={() => {
                        setEditingEvent(selectedProject);
                        setNewProject({
                          name: selectedProject.name,
                          startTime: selectedProject.startTime,
                          location: selectedProject.location || '',
                          description: selectedProject.description || '',
                          category: selectedProject.category || 'meeting',
                          endDate: selectedProject.endDate || ''
                        });
                        setSelectedProject(null);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="แก้ไขกิจกรรม"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้?')) {
                          setEvents(events.filter(e => e.id !== selectedProject.id));
                          setSelectedProject(null);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="ลบกิจกรรม"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}"""

replacement = """              <div className="flex items-center gap-2">
                {setEvents && (
                  <>
                    {!selectedProject.isProjectEvent && (
                      <button 
                        onClick={() => {
                          setEditingEvent(selectedProject);
                          setNewProject({
                            name: selectedProject.name,
                            startTime: selectedProject.startTime,
                            location: selectedProject.location || '',
                            description: selectedProject.description || '',
                            category: selectedProject.category || 'meeting',
                            endDate: selectedProject.endDate || ''
                          });
                          setSelectedProject(null);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="แก้ไขกิจกรรม"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้?')) {
                          if (selectedProject.id.startsWith('proj_')) {
                             const pid = selectedProject.id.replace('proj_', '');
                             setProjects?.(projects.map(p => p.id === pid ? {...p, startDate: '', endDate: '', startTime: ''} : p));
                          } else if (selectedProject.id.startsWith('session_')) {
                             const sid = selectedProject.id.replace('session_', '');
                             setSessions?.(sessions.filter(s => s.id !== sid));
                          } else {
                             setEvents(events.filter(e => e.id !== selectedProject.id));
                          }
                          setSelectedProject(null);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="ลบกิจกรรม"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/CalendarView.tsx', 'w') as f:
        f.write(content)
    print("Patched Modal Actions successfully")
else:
    print("Modal Actions target not found")
