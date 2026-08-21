import sys

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

date_formatter = """
  const formatThaiDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      return `${parseInt(day)} ${thaiMonths[parseInt(month) - 1]} ${parseInt(year) + 543}`;
    } catch {
      return dateString;
    }
  };
"""

content = content.replace("  const filteredSessions = sessions.filter(s => s.projectId === selectedProjectId);", date_formatter + "\n  const filteredSessions = sessions.filter(s => s.projectId === selectedProjectId);")

target = """                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-slate-500 font-semibold">
                     <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"><Calendar size={12} className="text-indigo-500"/> {s.time}</span>"""
replacement = """                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-slate-500 font-semibold">
                     {s.date && <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"><Calendar size={12} className="text-indigo-500"/> {formatThaiDate(s.date)}</span>}
                     <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"><Clock size={12} className="text-indigo-500"/> {s.time}</span>"""
                     
content = content.replace(target, replacement)
content = content.replace("import { Lock, BookOpen, Users, Calendar, LayoutDashboard, Shield, Edit, Trash2, Plus, LogOut, Briefcase, Clock, MapPin, Search, ChevronDown, Check, FileText , Files } from 'lucide-react';", "import { Lock, BookOpen, Users, Calendar, LayoutDashboard, Shield, Edit, Trash2, Plus, LogOut, Briefcase, Clock, MapPin, Search, ChevronDown, Check, FileText , Files } from 'lucide-react';")

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
