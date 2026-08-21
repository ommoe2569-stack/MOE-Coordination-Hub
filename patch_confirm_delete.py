import sys, re

with open('src/views/CalendarView.tsx', 'r') as f:
    content = f.read()

# Add the state
state_target = r"const \[editingEvent, setEditingEvent\] = useState<CalendarEvent \| null>\(null\);"
state_repl = "const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);\n  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);"
content = re.sub(state_target, state_repl, content)

# Modify handleDeleteEvent -> confirmDeleteEvent and executeDeleteEvent
delete_target = r"const handleDeleteEvent = \(eventToDelete: CalendarEvent\) => \{.*?  \};\n"
delete_repl = """const executeDeleteEvent = () => {
    if (!eventToDelete) return;
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
    setEventToDelete(null);
  };

  const confirmDeleteEvent = (event: CalendarEvent) => {
    setEventToDelete(event);
  };
"""
content = re.sub(delete_target, delete_repl, content, flags=re.DOTALL)

# Update the buttons to call confirmDeleteEvent
content = content.replace("onClick={() => handleDeleteEvent(selectedProject)}", "onClick={() => confirmDeleteEvent(selectedProject)}")
content = content.replace("onClick={() => handleDeleteEvent(editingEvent)}", "onClick={() => confirmDeleteEvent(editingEvent)}")

# Add the confirmation modal at the end of the return statement
modal_target = r"(\s+)\{\/\* Print Only Layout \*\/\}g"
# actually, let's insert before Print Only Layout
confirm_modal = """
      {/* Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100 flex flex-col p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการลบ</h3>
            <p className="text-slate-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรม "{eventToDelete.name}"? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setEventToDelete(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={executeDeleteEvent}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-rose-200"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
"""

content = content.replace("{/* Print Only Layout */}", confirm_modal + "\n      {/* Print Only Layout */}")

with open('src/views/CalendarView.tsx', 'w') as f:
    f.write(content)
print("Patched successfully")
