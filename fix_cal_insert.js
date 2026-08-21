import fs from 'fs';
let content = fs.readFileSync('src/views/CalendarView.tsx', 'utf8');

const addModalCode = `
      {/* Modal Popup for Adding Project */}
      {addingToDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                 <CalendarIcon size={24} />
              </div>
              <button 
                onClick={() => setAddingToDate(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6">
              <input 
                type="text"
                placeholder="ชื่อโครงการ / กิจกรรม"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                className="w-full text-xl font-extrabold text-slate-800 mb-4 leading-tight border-none focus:ring-0 px-0 placeholder:text-slate-300 bg-transparent"
                autoFocus
              />
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">เวลา</p>
                    <input 
                      type="time"
                      value={newProject.startTime}
                      onChange={(e) => setNewProject({...newProject, startTime: e.target.value})}
                      className="w-full font-semibold text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">สถานที่</p>
                    <input 
                      type="text"
                      placeholder="ระบุสถานที่"
                      value={newProject.location}
                      onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                      className="w-full font-semibold text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-sm pt-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <AlignLeft size={16} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">รายละเอียด</p>
                      <textarea
                        rows={3}
                        placeholder="ระบุรายละเอียดเพิ่มเติม"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="w-full font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  if (newProject.name.trim() && setEvents && addingToDate) {
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
                  setAddingToDate(null);
                  setNewProject({ name: '', startTime: '', location: '', description: '' });
                }}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-blue-200"
              >
                บันทึกกิจกรรม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(/<\/div>\s*\)\s*\}\s*<\/div>\s*\);\s*\}/, "</div>\n      )}\n" + addModalCode);
fs.writeFileSync('src/views/CalendarView.tsx', content);
