const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'className={`flex-1 overflow-y-auto print:overflow-visible p-4 md:p-8 print:p-0 w-full flex flex-col ${currentView !== "admin" ? "bg-white dark:bg-slate-950" : ""}`}',
  'className="flex-1 overflow-y-auto print:overflow-visible p-4 md:p-8 print:p-0 w-full flex flex-col"'
);

fs.writeFileSync('src/App.tsx', code);
