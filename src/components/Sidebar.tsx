import React, { useState, useEffect } from 'react';
import { 
  Home, UserPlus, Folder, FileText, BookOpen, Users, 
  MessageSquare, Image as ImageIcon, Phone, HelpCircle, 
  ClipboardList, Moon, Sun, Calendar, Lock, ChevronDown, ChevronUp
, Files } from 'lucide-react';
import { ViewType, ProjectItem } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  activeProject?: ProjectItem;
  pendingQaCount?: number;
}

export default function Sidebar({ currentView, setCurrentView, activeProject, pendingQaCount = 0 }: SidebarProps) {
  const [isDataOpen, setIsDataOpen] = useState(true);
  const [isCommunityOpen, setIsCommunityOpen] = useState(true);

  const isFeatureEnabled = (key: string) => {
    if (!activeProject) return true; // If no project is active, show everything by default
    return activeProject.features?.[key] !== false; // Default to true if not explicitly set to false
  };
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const NavItem = ({ icon: Icon, label, view, indent = false, badge = 0 }: { icon: any, label: string, view: ViewType, indent?: boolean, badge?: number }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setCurrentView(view)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isActive 
            ? 'bg-blue-600 text-white font-bold shadow-md' 
            : 'text-slate-600 hover:bg-slate-100 font-medium'
        } ${indent ? 'ml-6 w-[calc(100%-1.5rem)]' : ''}`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
          <span className="text-sm">{label}</span>
        </div>
        {badge > 0 && (
          <span className="flex items-center justify-center w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full animate-pulse shadow-sm">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-72 flex flex-col h-screen bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto hidden md:flex sticky top-0 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            M
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <h1 className="font-bold text-slate-800 dark:text-slate-100 leading-tight text-[13px] xl:text-sm tracking-tight truncate">MOE Coordination Hub</h1>
            <p className="text-[12px] xl:text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">สำนักงานรัฐมนตรี ศธ.</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-2">
        <p className="text-[14px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">เมนูหลัก</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <NavItem icon={Home} label="หน้าหลัก Dashboard" view="home" />
        {isFeatureEnabled('calendar') && <NavItem icon={Calendar} label="ปฏิทินกิจกรรม" view="calendar" />}
        {isFeatureEnabled('register') && <NavItem icon={UserPlus} label="แบบแจ้งรายชื่อ" view="register" />}
        
        {(isFeatureEnabled('download') || isFeatureEnabled('ebook') || isFeatureEnabled('other_docs')) && (
          <div className="pt-2">
            <button 
              onClick={() => setIsDataOpen(!isDataOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <Folder size={18} className="text-slate-400" />
                <span className="text-sm font-medium">คลังข้อมูล</span>
              </div>
              {isDataOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
            </button>
            
            {isDataOpen && (
              <div className="mt-1 space-y-1">
                {isFeatureEnabled('download') && <NavItem icon={FileText} label="ผังที่นั่ง-รายชื่อ" view="download" indent />}
                {isFeatureEnabled('ebook') && <NavItem icon={BookOpen} label="ผังแนวทางการดำเนินงาน" view="ebook" indent />}
                {isFeatureEnabled('other_docs') && <NavItem icon={Files} label="เอกสารที่เกี่ยวข้อง" view="other_docs" indent />}
              </div>
            )}
          </div>
        )}

        {isFeatureEnabled('gallery') && (
          <div className="pt-2">
            <button 
              onClick={() => setIsCommunityOpen(!isCommunityOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users size={18} className="text-slate-400" />
                <span className="text-sm font-medium">Community</span>
              </div>
              {isCommunityOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
            </button>
            
            {isCommunityOpen && (
              <div className="mt-1 space-y-1">
                {isFeatureEnabled('gallery') && <NavItem icon={ImageIcon} label="Photo Gallery" view="gallery" indent />}
              </div>
            )}
          </div>
        )}

        <div className="pt-4 mt-2 border-t border-slate-200">
          {isFeatureEnabled('contact') && <NavItem icon={Phone} label="Contact" view="contact" />}
          {isFeatureEnabled('qa') && <NavItem icon={HelpCircle} label="Smart Q&A" view="qa" badge={pendingQaCount} />}
          {isFeatureEnabled('evaluation') && <NavItem icon={ClipboardList} label="ประเมินการจัดงาน" view="evaluation" />}
        </div>
      </nav>
      
      <div className="p-4 mt-auto">
         <div className="mb-4 flex items-center justify-between px-2 text-slate-600 dark:text-slate-300">
           <span className="text-sm font-medium">Dark Mode</span>
           <button 
             onClick={() => setIsDarkMode(!isDarkMode)}
             className="w-11 h-6 rounded-full bg-slate-300 dark:bg-blue-600 relative transition-colors focus:outline-none"
             title="Toggle Dark Mode"
           >
             <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'} flex items-center justify-center shadow-sm`}>
               {isDarkMode ? <Moon size={10} className="text-blue-600" /> : <Sun size={10} className="text-amber-500" />}
             </div>
           </button>
         </div>
         <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-5 text-white shadow-lg shadow-blue-900/20">
            <p className="text-xs font-medium text-blue-200">ผู้ดูแลระบบ</p>
            <div className="flex items-center gap-3 mt-3">
               <div className="w-10 h-10 rounded-full bg-slate-100/20 flex items-center justify-center text-sm font-bold border border-white/10">ADM</div>
               <div className="text-sm font-semibold tracking-wide">Admin Team</div>
            </div>
            <button 
              onClick={() => setCurrentView('admin')}
              className="mt-5 w-full py-2.5 bg-slate-100 text-blue-800 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors uppercase tracking-widest shadow-sm"
            >
              จัดการระบบ
            </button>
         </div>
      </div>
    </aside>
  );
}
