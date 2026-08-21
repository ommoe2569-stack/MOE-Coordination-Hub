import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Change global background
content = content.replace(
  'className="flex h-screen print:h-auto bg-slate-200 font-sans text-slate-800 overflow-hidden print:overflow-visible print:bg-slate-100 selection:bg-blue-200"',
  'className="flex h-screen print:h-auto bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 font-sans text-slate-800 overflow-hidden print:overflow-visible print:bg-white selection:bg-blue-200"'
);

fs.writeFileSync('src/App.tsx', content);
