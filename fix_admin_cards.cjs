const fs = require('fs');
let code = fs.readFileSync('src/views/AdminView.tsx', 'utf8');

// Replace bg-slate-200 rounded-3xl with bg-white rounded-3xl
code = code.replace(/bg-slate-200(?=.*rounded-3xl)/g, 'bg-white');

// Replace border-slate-300 with border-slate-200
code = code.replace(/border-slate-300/g, 'border-slate-200');

// Tab buttons: bg-slate-200 text-slate-600 hover:bg-slate-100 -> bg-slate-50 text-slate-600 hover:bg-slate-100
code = code.replace(/bg-slate-200 text-slate-600 hover:bg-slate-100/g, 'bg-slate-50 text-slate-600 hover:bg-slate-100');

fs.writeFileSync('src/views/AdminView.tsx', code);
