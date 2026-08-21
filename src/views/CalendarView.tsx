import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, X, AlignLeft, Edit, Trash2, Printer, Download, Plus } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';
import { ProjectItem, SessionItem } from '../types';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  setEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  projects?: ProjectItem[];
  sessions?: SessionItem[];
  setProjects?: any;
  setSessions?: any;
}

const CATEGORY_CONFIG = {
  meeting: { label: 'ประชุม', bg: 'bg-blue-100', border: 'border-blue-200', hoverBg: 'hover:bg-blue-200', text: 'text-blue-900', icon: 'text-blue-600/80', dot: 'bg-blue-500' },
  training: { label: 'อบรม/สัมมนา', bg: 'bg-emerald-100', border: 'border-emerald-200', hoverBg: 'hover:bg-emerald-200', text: 'text-emerald-900', icon: 'text-emerald-600/80', dot: 'bg-emerald-500' },
  social: { label: 'กิจกรรมสังคม', bg: 'bg-amber-100', border: 'border-amber-200', hoverBg: 'hover:bg-amber-200', text: 'text-amber-900', icon: 'text-amber-600/80', dot: 'bg-amber-500' },
  other: { label: 'อื่นๆ', bg: 'bg-slate-100', border: 'border-slate-200', hoverBg: 'hover:bg-slate-200', text: 'text-slate-900', icon: 'text-slate-600/80', dot: 'bg-slate-500' },
  project: { label: 'โครงการ (Project)', bg: 'bg-purple-100', border: 'border-purple-200', hoverBg: 'hover:bg-purple-200', text: 'text-purple-900', icon: 'text-purple-600/80', dot: 'bg-purple-500' }
};

export default function CalendarView({ events, setEvents, projects = [], sessions = [], setProjects, setSessions }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Combine calendar events with project events
  const allEvents = useMemo(() => {
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

    return [...events, ...projectEvents];
  }, [events, projects]);

  const [selectedProject, setSelectedProject] = useState<CalendarEvent | null>(null);
  const [addingToDate, setAddingToDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);
  const [newProject, setNewProject] = useState<{name: string, startTime: string, location: string, description: string, category: 'meeting' | 'training' | 'social' | 'other', endDate: string}>({ name: '', startTime: '', location: '', description: '', category: 'meeting', endDate: '' });
  
  const printRef = useRef<HTMLDivElement>(null);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const executeDeleteEvent = () => {
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

  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNamesThai = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const daysThai = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const numDays = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const days = Array.from({ length: numDays }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter(e => {
      if (e.endDate) {
        return dateStr >= e.date && dateStr <= e.endDate;
      }
      return e.date === dateStr;
    });
  };

  const currentMonthEvents = allEvents.filter(e => {
    const eDate = new Date(e.date);
    return eDate.getMonth() === month && eDate.getFullYear() === year;
  }).sort((a, b) => {
     const dateA = new Date(`${a.date}T${a.startTime}`);
     const dateB = new Date(`${b.date}T${b.startTime}`);
     return dateA.getTime() - dateB.getTime();
  });

  const formatDateThai = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${parseInt(d, 10)} ${monthNamesThai[parseInt(m, 10) - 1]} ${parseInt(y, 10) + 543}`;
  };

  const exportPDF = () => {
    const element = printRef.current;
    if (!element) return;

    // Temporarily make it visible for html2pdf
    element.classList.remove('hidden', 'print:block');
    element.style.display = 'block';

    const opt = {
      margin:       10,
      filename:     `รายงานกิจกรรม-${monthNamesThai[month]}-${year + 543}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Revert styles
      element.style.display = '';
      element.classList.add('hidden', 'print:block');
    });
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `รายงานกิจกรรม-${monthNamesThai[month]}-${year + 543}`,
    onBeforePrint: () => {
      const element = printRef.current;
      if (element) {
        element.classList.remove('hidden');
        element.style.display = 'block';
      }
      return Promise.resolve();
    },
    onAfterPrint: () => {
      const element = printRef.current;
      if (element) {
        element.style.display = '';
        element.classList.add('hidden');
      }
    }
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-fade-in print:p-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 print:hidden">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
              <CalendarIcon size={28} />
            </div>
            ปฏิทินกิจกรรม (Calendar View)
          </h2>
          <p className="text-slate-500 mt-2 font-medium">ดูภาพรวมโครงการและกิจกรรมทั้งหมดในรูปแบบรายเดือน</p>
        </div>
        
        <div className="flex items-center bg-white rounded-xl shadow-sm border border-slate-200 p-1">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="px-4 font-bold text-slate-700 min-w-[140px] text-center">
            {monthNamesThai[month]} {year + 543}
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
            <ChevronRight size={20} />
          </button>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <button onClick={goToday} className="px-3 py-1.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            วันนี้
          </button>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <button onClick={exportPDF} className="px-3 py-1.5 flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Download size={16} /> โหลด PDF
          </button>
          <button onClick={handlePrint} className="px-3 py-1.5 flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Printer size={16} /> พิมพ์
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden print:hidden">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {daysThai.map((day, i) => (
            <div key={day} className={`py-4 text-center text-sm font-bold ${i === 0 || i === 6 ? 'text-rose-500' : 'text-slate-500'}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-[minmax(120px,_1fr)]">
          {blanks.map(blank => (
            <div key={`blank-${blank}`} className="border-r border-b border-slate-100 bg-slate-50/50 min-h-[120px]"></div>
          ))}
          
          {days.map(day => {
            const dayEvents = getEventsForDate(day);
            const today = isToday(day);
            return (
              <div 
                key={day} 
                onClick={() => setEvents && setAddingToDate(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                className={`border-r border-b border-slate-100 p-2 min-h-[120px] transition-colors group ${setEvents ? 'hover:bg-slate-50 cursor-pointer' : ''} ${today ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${today ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-700 group-hover:bg-slate-200'}`}>
                    {day}
                  </div>
                  {setEvents && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddingToDate(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
                      }}
                      className="p-1 rounded-full text-blue-500 hover:bg-blue-100 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                      title="เพิ่มกิจกรรม"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
                <div className="space-y-1.5">
                  {dayEvents.map(project => {
                    const catConfig = CATEGORY_CONFIG[project.category || 'meeting'];
                    return (
                    <div key={project.id} onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }} className={`${catConfig.bg} ${catConfig.border} border ${catConfig.hoverBg} rounded-lg p-2.5 text-xs group/item hover:shadow transition-all cursor-pointer`}>
                      <div className={`font-extrabold ${catConfig.text} mb-1 leading-tight`}>
                        <div className="line-clamp-2" title={project.name}>
                          {project.name}
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 ${catConfig.icon} mb-0.5 truncate`}>
                        <Clock size={10} className="shrink-0" /> {project.startTime} น.
                      </div>
                      {project.location && (
                        <div className={`flex items-center gap-1 ${catConfig.icon} truncate`}>
                          <MapPin size={10} className="shrink-0" /> {project.location}
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    
      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col">
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                 <CalendarIcon size={24} />
              </div>
              <div className="flex items-center gap-2">
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
                      onClick={() => confirmDeleteEvent(selectedProject)}
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
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-extrabold text-slate-800 mb-4 leading-tight">{selectedProject.name}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">เวลา</p>
                    <p className="font-semibold text-slate-700">{selectedProject.startTime} น.</p>
                  </div>
                </div>
                
                {selectedProject.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">สถานที่</p>
                      <p className="font-semibold text-slate-700">{selectedProject.location}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3 text-sm pt-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <AlignLeft size={16} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">รายละเอียด</p>
                      <p className="font-medium text-slate-600 leading-relaxed text-balance">
                         {selectedProject.description || "ไม่มีรายละเอียด"}
                      </p>
                    </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-blue-200"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Popup for Adding Project */}
      {(addingToDate || editingEvent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                 <CalendarIcon size={24} />
              </div>
              <button 
                onClick={() => { setAddingToDate(null); setEditingEvent(null); setNewProject({ name: '', startTime: '', location: '', description: '', category: 'meeting', endDate: '' }); }}
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
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">เวลา</p>
                      <input 
                        type="time"
                        value={newProject.startTime}
                        onChange={(e) => setNewProject({...newProject, startTime: e.target.value})}
                        className="w-full font-semibold text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ถึงวันที่ (ไม่บังคับ)</p>
                      <input 
                        type="date"
                        value={newProject.endDate}
                        min={editingEvent ? editingEvent.date : addingToDate || undefined}
                        onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                        className="w-full font-semibold text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
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
              
              <div className="flex gap-3 mt-4">
                {editingEvent && (
                  <button 
                    onClick={() => confirmDeleteEvent(editingEvent)}
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
              </div>
            </div>
          </div>
        </div>
      )}

      
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

      {/* Print Only Layout */}
      <div ref={printRef} className="hidden print:block font-sans" style={{ color: '#1e293b' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          ปฏิทินกิจกรรม ประจำเดือน{monthNamesThai[month]} พ.ศ. {year + 543}
        </h2>
        <table className="w-full border-collapse text-sm" style={{ border: '1px solid #cbd5e1' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th className="p-3 w-16 text-center" style={{ border: '1px solid #cbd5e1' }}>ลำดับที่</th>
              <th className="p-3 w-36 text-center" style={{ border: '1px solid #cbd5e1' }}>วัน/เวลา</th>
              <th className="p-3 text-left" style={{ border: '1px solid #cbd5e1' }}>กิจกรรม</th>
              <th className="p-3 w-48 text-left" style={{ border: '1px solid #cbd5e1' }}>สถานที่</th>
            </tr>
          </thead>
          <tbody>
            {currentMonthEvents.length > 0 ? (
              currentMonthEvents.map((e, index) => (
                <tr key={e.id}>
                  <td className="p-3 text-center" style={{ border: '1px solid #cbd5e1' }}>{index + 1}</td>
                  <td className="p-3 text-center" style={{ border: '1px solid #cbd5e1' }}>
                    <div className="font-bold">{formatDateThai(e.date)}{e.endDate ? ` - ${formatDateThai(e.endDate)}` : ''}</div>
                    <div style={{ color: '#475569', marginTop: '4px' }}>{e.startTime} น.</div>
                  </td>
                  <td className="p-3 font-medium" style={{ border: '1px solid #cbd5e1' }}>{e.name}</td>
                  <td className="p-3" style={{ color: '#475569', border: '1px solid #cbd5e1' }}>{e.location || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center" style={{ color: '#64748b', border: '1px solid #cbd5e1' }}>
                  ไม่มีกิจกรรมในเดือนนี้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
