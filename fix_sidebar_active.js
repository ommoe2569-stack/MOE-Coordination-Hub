import fs from 'fs';
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

// Using regex to replace the class name properly regardless of spaces
content = content.replace(/bg-blue-50 text-blue-700 font-bold shadow-sm/g, 'bg-blue-600 text-white font-bold shadow-md');

// Also fix the text-white vs text-slate-400
content = content.replace(/className=\{isActive \? 'text-white' : 'text-slate-400'\}/g, "className={isActive ? 'text-white' : 'text-slate-400'}");
// Wait, originally it was text-blue-600
content = content.replace(/className=\{isActive \? 'text-blue-600' : 'text-slate-400'\}/g, "className={isActive ? 'text-white' : 'text-slate-400'}");

fs.writeFileSync('src/components/Sidebar.tsx', content);
