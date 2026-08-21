import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Download, BookOpen, MessageSquare, HelpCircle, 
  Image as ImageIcon, ClipboardList, Phone, FileQuestion, Calendar, MapPin, Clock, Users
} from 'lucide-react';
import { ViewType, SessionItem, ProjectItem } from '../types';
import { Files } from 'lucide-react';

interface HomeViewProps {
  setCurrentView: (view: ViewType) => void;
  sessions: SessionItem[];
  projects: ProjectItem[];
}

export default function HomeView({ setCurrentView, sessions, projects }: HomeViewProps) {
    const quickAccessButtons = [
    { icon: UserPlus, label: 'แบบแจ้งรายชื่อ', view: 'register' as ViewType, color: 'text-pink-700', bg: 'bg-gradient-to-br from-pink-200 to-rose-300', hover: 'hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-1' },
    { icon: Download, label: 'ผังที่นั่ง-รายชื่อ', view: 'download' as ViewType, color: 'text-blue-700', bg: 'bg-gradient-to-br from-blue-200 to-indigo-300', hover: 'hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1' },
    { icon: BookOpen, label: 'ผังแนวทาง', view: 'ebook' as ViewType, color: 'text-purple-700', bg: 'bg-gradient-to-br from-purple-200 to-fuchsia-300', hover: 'hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1' },
    { icon: Files, label: 'เอกสารที่เกี่ยวข้อง', view: 'other_docs' as ViewType, color: 'text-teal-700', bg: 'bg-gradient-to-br from-teal-200 to-emerald-300', hover: 'hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1' },
    { icon: Phone, label: 'Contact', view: 'contact' as ViewType, color: 'text-indigo-800', bg: 'bg-gradient-to-br from-indigo-200 to-blue-300', hover: 'hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1' },
    { icon: HelpCircle, label: 'Q&A', view: 'qa' as ViewType, color: 'text-amber-800', bg: 'bg-gradient-to-br from-amber-200 to-orange-300', hover: 'hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1' },
    { icon: ImageIcon, label: 'แกลเลอรี่', view: 'gallery' as ViewType, color: 'text-rose-700', bg: 'bg-gradient-to-br from-rose-200 to-red-300', hover: 'hover:shadow-lg hover:shadow-rose-500/30 hover:-translate-y-1' },
    { icon: ClipboardList, label: 'ประเมินผล', view: 'evaluation' as ViewType, color: 'text-cyan-800', bg: 'bg-gradient-to-br from-cyan-200 to-blue-300', hover: 'hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1' },
  ];

  
  const activeProject = projects.find(p => p.isActive);
  const activeSessions = sessions.filter(s => activeProject ? s.projectId === activeProject.id : false);
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  
  const visibleButtons = quickAccessButtons.filter(btn => {
    if (!activeProject) return true;
    return activeProject.features?.[btn.view] !== false;
  });


  useEffect(() => {
    if (!activeProject?.startDate) {
      setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      return;
    }
    
    // Safely parse target date by replacing dashes with slashes if needed for Safari compatibility, 
    // or just rely on standard ISO8601 parsing which is safe for YYYY-MM-DDTHH:mm:00
    const targetDate = new Date(`${activeProject.startDate}T${activeProject.startTime || '00:00'}:00`);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0 || isNaN(diff)) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0'),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeProject]);

  const formatThaiDate = (dateString?: string) => {
    if (!dateString) return '17 สิงหาคม 2569';
    try {
      const [year, month, day] = dateString.split('-');
      const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      return `${parseInt(day)} ${thaiMonths[parseInt(month) - 1]} ${parseInt(year) + 543}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 print:space-y-0">
      {/* Header Card (Pastel Gradient) */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 rounded-3xl p-8 shadow-sm border border-white relative overflow-hidden print:hidden">
        <div className="relative z-10">
          <p className="text-sm md:text-base font-extrabold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            ระบบบริหารจัดการ
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight w-full">
            {activeProject ? activeProject.name : 'ไม่มีโครงการที่เปิดใช้งาน'}
          </h2>
          <p className="text-slate-600 mb-8 font-semibold">สำนักงานรัฐมนตรี กระทรวงศึกษาธิการ</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2 bg-slate-100/60 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/40">
              <Calendar size={18} className="text-blue-600" />
              <span>
                {activeProject?.startDate && activeProject?.endDate && activeProject.startDate !== activeProject.endDate
                  ? `${formatThaiDate(activeProject.startDate)} - ${formatThaiDate(activeProject.endDate)}`
                  : activeProject?.startDate 
                    ? formatThaiDate(activeProject.startDate) 
                    : '17 สิงหาคม 2569'}
              </span>
            </div>
            {activeProject?.startTime && (
              <div className="flex items-center gap-2 bg-slate-100/60 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/40">
                <Clock size={18} className="text-blue-600" />
                <span>เวลา {activeProject.startTime} น.</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-slate-100/60 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/40">
              <MapPin size={18} className="text-blue-600" />
              <span>{activeProject?.location || 'ยังไม่ระบุสถานที่'}</span>
            </div>
          </div>
        </div>
        
        {/* Soft decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-y-1/4"></div>
      </div>

      <div className="space-y-6 print:space-y-0">
        {/* Countdown Card (Light Background) */}
        <div className="bg-slate-100/80 rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 print:hidden flex flex-col items-center relative">
          <div className="w-full mb-6">
             <h3 className="font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-start gap-2 text-sm md:text-base">
               <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
               นับถอยหลังสู่วันงาน
             </h3>
          </div>
          
          <div className="relative z-10 flex justify-center gap-4 sm:gap-6 md:gap-8 w-full">
            {[
              { value: timeLeft.days, label: 'วัน' },
              { value: timeLeft.hours, label: 'ชั่วโมง' },
              { value: timeLeft.minutes, label: 'นาที' },
              { value: timeLeft.seconds, label: 'วินาที' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-b from-slate-500 to-slate-600 rounded-2xl border border-slate-400/50 text-white flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-black mb-3 shadow-lg shadow-slate-600/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
                  <span className="relative z-10 drop-shadow-md">{item.value}</span>
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access (Smaller Cards, neatly arranged) */}
        <div className="bg-slate-100/80 rounded-3xl p-5 md:p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 print:hidden">
          <h3 className="font-extrabold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
             <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
             เข้าถึงด่วน
          </h3>
          <div 
            className="grid gap-3 md:gap-4"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 80px), 1fr))` }}
          >
            {visibleButtons.map((btn, i) => (
              <button
                key={i}
                onClick={() => setCurrentView(btn.view)}
                className={`${btn.bg} ${btn.hover} transition-all duration-300 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 sm:py-4 group border border-white/40 shadow-sm`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/80`}>
                  <btn.icon size={20} className={btn.color} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 drop-shadow-sm text-center leading-tight">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-slate-100 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col overflow-hidden print:shadow-none print:border-none print:rounded-none">
          {/* Print-only Event Header */}
          <div className="hidden print:block mb-8 border-b-2 border-slate-800 pb-4">
            <h1 className="text-2xl font-bold text-black mb-2">{activeProject ? activeProject.name : 'กำหนดการ'}</h1>
            <div className="flex gap-6 text-sm text-black">
              <span>
                {activeProject?.startDate && activeProject?.endDate && activeProject.startDate !== activeProject.endDate
                  ? `${formatThaiDate(activeProject.startDate)} - ${formatThaiDate(activeProject.endDate)}`
                  : activeProject?.startDate 
                    ? formatThaiDate(activeProject.startDate) 
                    : '17 สิงหาคม 2569'}
              </span>
              {activeProject?.startTime && <span>เวลา {activeProject.startTime} น.</span>}
              <span>สถานที่: {activeProject?.location || 'ยังไม่ระบุสถานที่'}</span>
            </div>
          </div>

          {activeSessions.length === 0 ? (
            <div className="p-6 print:px-0">
              <div className="py-8 text-center text-slate-400 font-medium">ยังไม่มีกำหนดการในขณะนี้</div>
            </div>
          ) : (
            Object.entries(
              activeSessions.reduce((acc, s) => {
                const d = s.date || activeProject?.startDate || 'default';
                if (!acc[d]) acc[d] = [];
                acc[d].push(s);
                return acc;
              }, {} as Record<string, typeof activeSessions>)
            ).sort(([a], [b]) => a.localeCompare(b)).map(([date, sessions], groupIndex) => (
              <div key={date} className="mb-4">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between print:hidden">
                  <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2 print:text-lg">
                    <div className="w-1.5 h-4 bg-blue-500 rounded-full print:bg-black"></div>
                    {date === 'default' ? 'กำหนดการ' : `กำหนดการ ${formatThaiDate(date)}`}
                  </h3>
                </div>
                {/* Print only header for each date if multiple days */}
                <div className="hidden print:block print:px-0 pt-4 pb-2 border-b border-slate-300 mb-4">
                  <h3 className="font-bold text-black text-lg">
                    {date === 'default' ? 'กำหนดการ' : `กำหนดการ ${formatThaiDate(date)}`}
                  </h3>
                </div>
                <div className="p-6 print:px-0 pt-2 pb-0">
                  <div className="flex flex-col pt-2">
                    {sessions.map((item, index) => {
                      const isBreak = item.tag === 'พัก';
                      const dotLineColor = isBreak ? 'bg-[#1cb0d6]' : 'bg-[#7e3af2]'; // Cyan for break, purple for others
                      const isLast = index === sessions.length - 1;
                      
                      return (
                        <div key={item.id} className="relative flex items-stretch min-h-[4.5rem] print:break-inside-avoid">
                          {/* Timeline Column */}
                          <div className="w-10 flex flex-col items-center print:w-8">
                            <div className={`w-3 h-3 rounded-full ${dotLineColor} z-10 shrink-0 mt-1 print:border-2 print:border-black print:bg-slate-100`}></div>
                            {!isLast && (
                              <div className={`w-0.5 grow ${dotLineColor} -mt-1 mb-1 opacity-90 print:bg-slate-300`}></div>
                            )}
                          </div>
                          
                          {/* Content Column */}
                          <div className="flex-1 pb-8 -mt-0.5 pr-4 print:pb-6">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-[13px] font-bold text-slate-600 print:text-black print:text-sm">{item.time}</span>
                              <span className={`px-3 py-0.5 bg-purple-100 text-purple-700 text-[10px] rounded-full font-bold print:border print:border-slate-300 print:bg-slate-100 print:text-black print:text-xs ${isBreak ? 'bg-blue-50 text-blue-700' : 'bg-blue-50 text-blue-700'}`}>
                                {item.tag}
                              </span>
                            </div>
                            <h4 className="text-[14px] md:text-[15px] font-extrabold text-slate-800 leading-relaxed print:text-black print:text-base">{item.title}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
}
