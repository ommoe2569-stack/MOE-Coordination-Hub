const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace body background
const oldBodyClass = "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900";
const newBodyClass = "bg-[#F0F4F8] dark:bg-slate-900";
code = code.replace(oldBodyClass, newBodyClass);

// Replace main container class
const oldMainClass = "\\${currentView !== \"admin\" ? \"bg-white dark:bg-slate-950\" : \"\"}";
const newMainClass = "";
code = code.replace(oldMainClass, newMainClass);

fs.writeFileSync('src/App.tsx', code);
