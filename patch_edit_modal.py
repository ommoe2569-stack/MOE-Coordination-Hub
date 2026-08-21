import sys, re

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

target = r'<button\s+onClick=\{\(\) => \{\s+if \(newProject\.name\.trim\(\) && setEvents\) \{.*?\{editingEvent \? "บันทึกการแก้ไข" : "บันทึกกิจกรรม"\}\s+</button>'

replacement = """<div className="flex gap-3 mt-4">
                {editingEvent && (
                  <button 
                    onClick={() => handleDeleteEvent(editingEvent)}
                    className="w-auto px-6 py-3.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl transition-colors border border-rose-200 shrink-0"
                  >
                    ลบ
                  </button>
                )}
                <button 
                 onClick={() => {
                  if (newProject.name.trim() && setEvents) {
                    if (editingEvent) {
                      setEvents(events.map(e => e.id === editingEvent.id ? {
                        ...e,
                        name: newProject.name,
                        startTime: newProject.startTime || '08:00',
                        location: newProject.location,
                        description: newProject.description,
                        category: newProject.category,
                        endDate: newProject.endDate || ''
                      } : e));
                    } else if (addingToDate) {
                      const newItem = {
                        id: 'e' + Date.now(),
                        name: newProject.name,
                        date: addingToDate,
                        endDate: newProject.endDate || '',
                        startTime: newProject.startTime || '08:00',
                        location: newProject.location,
                        description: newProject.description,
                        category: newProject.category
                      };
                      setEvents([...events, newItem]);
                    }
                  }
                  setAddingToDate(null);
                  setEditingEvent(null);
                  setNewProject({ name: '', startTime: '', location: '', description: '', category: 'meeting', endDate: '' });
                }}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-blue-200"
              >
                {editingEvent ? "บันทึกการแก้ไข" : "บันทึกกิจกรรม"}
              </button>
              </div>"""

new_content = re.sub(target, replacement, content, flags=re.DOTALL)
if new_content != content:
    with open('src/views/CalendarView.tsx', 'w') as f:
        f.write(new_content)
    print("Patched Edit Modal successfully")
else:
    print("Edit Modal target not found")
