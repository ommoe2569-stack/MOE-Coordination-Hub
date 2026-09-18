import React from 'react';
import { ProjectItem } from '../types';
import { Folder, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface LandingViewProps {
  activeProjects: ProjectItem[];
  onSelectProject: (id: string) => void;
}

export default function LandingView({ activeProjects, onSelectProject }: LandingViewProps) {
  const formatThaiDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-blue-500/20 mb-6">
          M
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-3">
          MOE Coordination Hub
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
          สำนักงานรัฐมนตรี กระทรวงศึกษาธิการ
        </p>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2 bg-blue-50 dark:bg-blue-900/30 inline-block px-4 py-1.5 rounded-full">
          กรุณาเลือกโครงการที่ต้องการเข้าใช้งาน
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeProjects.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectProject(p.id)}
            className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-3xl p-6 text-left border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 text-blue-100 dark:text-blue-900/20 group-hover:text-blue-500 transition-colors">
              <CheckCircle2 size={24} />
            </div>
            
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Folder size={24} />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
              {p.name}
            </h3>
            
            <div className="mt-auto space-y-2.5">
              {(p.startDate || p.endDate) && (
                <div className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar size={16} className="shrink-0 text-slate-400 mt-0.5" />
                  <span className="font-medium line-clamp-1">
                    {p.startDate && p.endDate && p.startDate !== p.endDate
                      ? `${formatThaiDate(p.startDate)} - ${formatThaiDate(p.endDate)}`
                      : formatThaiDate(p.startDate)}
                  </span>
                </div>
              )}
              {p.location && (
                <div className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin size={16} className="shrink-0 text-slate-400 mt-0.5" />
                  <span className="font-medium line-clamp-1">{p.location}</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
