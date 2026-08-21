import fs from 'fs';
let content = fs.readFileSync('src/views/CalendarView.tsx', 'utf8');

// I will import Edit and Trash icons
content = content.replace(
  "import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, X, AlignLeft } from 'lucide-react';",
  "import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, X, AlignLeft, Edit, Trash2 } from 'lucide-react';"
);

// Add editingEvent state
content = content.replace(
  "const [addingToDate, setAddingToDate] = useState<string | null>(null);",
  "const [addingToDate, setAddingToDate] = useState<string | null>(null);\n  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);"
);

// In the Modal Popup for Project Details, add edit and delete buttons next to the X button
const detailsHeader = `<div className="p-6 pb-0 flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                 <CalendarIcon size={24} />
              </div>
              <div className="flex items-center gap-2">
                {setEvents && (
                  <>
                    <button 
                      onClick={() => {
                        setEditingEvent(selectedProject);
                        setNewProject({
                          name: selectedProject.name,
                          startTime: selectedProject.startTime,
                          location: selectedProject.location || '',
                          description: selectedProject.description || ''
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
                )}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>`;

content = content.replace(
  /<div className="p-6 pb-0 flex justify-between items-start">[\s\S]*?<button[\s\S]*?onClick=\{[\s\S]*?setSelectedProject\(null\)\}[\s\S]*?className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"[\s\S]*?>\s*<X size=\{18\} \/>\s*<\/button>\s*<\/div>/,
  detailsHeader
);

// We need to use editingEvent or addingToDate for the Edit Modal
// Change {addingToDate && (...)} to {(addingToDate || editingEvent) && (...)}
content = content.replace(
  "{addingToDate && (",
  "{(addingToDate || editingEvent) && ("
);

content = content.replace(
  "onClick={() => setAddingToDate(null)}",
  "onClick={() => { setAddingToDate(null); setEditingEvent(null); setNewProject({ name: '', startTime: '', location: '', description: '' }); }}"
);

// Replace save logic
const saveLogic = `onClick={() => {
                  if (newProject.name.trim() && setEvents) {
                    if (editingEvent) {
                      setEvents(events.map(e => e.id === editingEvent.id ? {
                        ...e,
                        name: newProject.name,
                        startTime: newProject.startTime || '08:00',
                        location: newProject.location,
                        description: newProject.description
                      } : e));
                    } else if (addingToDate) {
                      const newItem = {
                        id: 'e' + Date.now(),
                        name: newProject.name,
                        date: addingToDate,
                        startTime: newProject.startTime || '08:00',
                        location: newProject.location,
                        description: newProject.description
                      };
                      setEvents([...events, newItem]);
                    }
                  }
                  setAddingToDate(null);
                  setEditingEvent(null);
                  setNewProject({ name: '', startTime: '', location: '', description: '' });
                }}`;

content = content.replace(
  /onClick=\{\(\) => \{\s*if \(newProject\.name\.trim\(\) && setEvents && addingToDate\) \{[\s\S]*?setNewProject\(\{ name: '', startTime: '', location: '', description: '' \}\);\s*\}\}/,
  saveLogic
);

// Update placeholders and labels conditionally if it's editing vs adding
content = content.replace(
  'บันทึกกิจกรรม',
  '{editingEvent ? "บันทึกการแก้ไข" : "บันทึกกิจกรรม"}'
);

fs.writeFileSync('src/views/CalendarView.tsx', content);
