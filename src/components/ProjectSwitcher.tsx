import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Folder } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectSwitcherProps {
  activeProjects: ProjectItem[];
  selectedProject?: ProjectItem;
  onSelect: (id: string) => void;
  isMobile?: boolean;
}

export default function ProjectSwitcher({ activeProjects, selectedProject, onSelect, isMobile = false }: ProjectSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (activeProjects.length <= 1) {
    return (
      <div className={`flex-1 min-w-0 ${!isMobile ? 'pr-2' : ''}`}>
        <h1 className={`font-bold leading-tight tracking-tight truncate ${isMobile ? 'text-blue-900 text-sm sm:text-base' : 'text-slate-800 dark:text-slate-100 text-[13px] xl:text-sm'}`}>
          {selectedProject?.name || 'MOE Coordination Hub'}
        </h1>
        <p className={`font-medium mt-0.5 truncate ${isMobile ? 'text-[13px] sm:text-[14px] text-slate-500' : 'text-[12px] xl:text-[13px] text-slate-500 dark:text-slate-400'}`}>
          สำนักงานรัฐมนตรี ศธ.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative flex-1 min-w-0 ${!isMobile ? 'pr-2' : ''}`} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group flex flex-col focus:outline-none"
      >
        <div className="flex items-center justify-between w-full">
          <h1 className={`font-bold leading-tight tracking-tight truncate group-hover:text-blue-600 transition-colors ${isMobile ? 'text-blue-900 text-sm sm:text-base' : 'text-slate-800 dark:text-slate-100 text-[13px] xl:text-sm'}`}>
            {selectedProject?.name || 'เลือกโครงการ'}
          </h1>
          <ChevronDown size={16} className={`transition-transform shrink-0 ml-1 ${isMobile ? 'text-blue-800' : 'text-slate-400'} ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <p className={`font-medium mt-0.5 truncate ${isMobile ? 'text-[13px] sm:text-[14px] text-slate-500' : 'text-[12px] xl:text-[13px] text-slate-500 dark:text-slate-400'}`}>
          สลับโครงการ ({activeProjects.length} โครงการ)
        </p>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[280px] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 overflow-hidden">
          <div className="px-3 pb-2 mb-2 border-b border-slate-100 dark:border-slate-700">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">โครงการที่เปิดใช้งาน</p>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {activeProjects.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  onSelect(p.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${selectedProject?.id === p.id ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
              >
                <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${selectedProject?.id === p.id ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  <Folder size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate font-medium ${selectedProject?.id === p.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {p.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
