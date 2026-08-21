import fs from 'fs';
let content = fs.readFileSync('src/views/HomeView.tsx', 'utf8');
content = content.replace(
  /const quickAccessButtons = \[[\s\S]*?\];/,
  `const quickAccessButtons = [
    { icon: UserPlus, label: 'ลงทะเบียน (แจ้งรายชื่อ)', view: 'register' as ViewType, color: 'text-pink-600', bg: 'bg-pink-50', hover: 'hover:bg-pink-100 hover:shadow-pink-100' },
    { icon: Download, label: 'เอกสาร', view: 'download' as ViewType, color: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:bg-blue-100 hover:shadow-blue-100' },
    { icon: BookOpen, label: 'E-Book', view: 'ebook' as ViewType, color: 'text-purple-600', bg: 'bg-purple-50', hover: 'hover:bg-purple-100 hover:shadow-purple-100' },
    { icon: MessageSquare, label: 'Social Wall', view: 'social' as ViewType, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100 hover:shadow-emerald-100' },
    { icon: HelpCircle, label: 'Q&A', view: 'qa' as ViewType, color: 'text-amber-600', bg: 'bg-amber-50', hover: 'hover:bg-amber-100 hover:shadow-amber-100' },
    { icon: ImageIcon, label: 'แกลเลอรี่', view: 'gallery' as ViewType, color: 'text-rose-600', bg: 'bg-rose-50', hover: 'hover:bg-rose-100 hover:shadow-rose-100' },
    { icon: ClipboardList, label: 'ประเมินผล', view: 'evaluation' as ViewType, color: 'text-cyan-600', bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100 hover:shadow-cyan-100' },
    { icon: FileQuestion, label: 'คู่มือ', view: 'manual' as ViewType, color: 'text-indigo-600', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100 hover:shadow-indigo-100' },
  ];`
);
content = content.replace('from-blue-50 via-slate-100 to-emerald-50', 'from-indigo-50 via-blue-50 to-purple-50');
content = content.replace('from-blue-50 to-emerald-50', 'from-blue-50 to-indigo-50');
content = content.replace(/text-blue-600 uppercase tracking-wider mb-3/g, 'text-indigo-500 uppercase tracking-wider mb-3');
content = content.replace(/bg-blue-600 rounded-full/g, 'bg-indigo-500 rounded-full');
// We need to just fix those headers carefully.
fs.writeFileSync('src/views/HomeView.tsx', content);
