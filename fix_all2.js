import fs from 'fs';

// App.tsx Background
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  '<main className="flex-1 overflow-y-auto print:overflow-visible p-4 md:p-8 print:p-0 w-full flex flex-col">',
  '<main className={`flex-1 overflow-y-auto print:overflow-visible p-4 md:p-8 print:p-0 w-full flex flex-col ${currentView !== "admin" ? "bg-white" : ""}`}>'
);
fs.writeFileSync('src/App.tsx', appContent);


// HomeView.tsx
let homeContent = fs.readFileSync('src/views/HomeView.tsx', 'utf8');
homeContent = homeContent.replace(
  'w-full aspect-square max-w-[90px] xl:max-w-[100px] bg-slate-100 rounded-2xl shadow-sm text-blue-700 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 lg:mb-3',
  'w-full aspect-square max-w-[90px] xl:max-w-[100px] bg-gradient-to-b from-blue-600 to-indigo-700 rounded-2xl shadow-lg border border-blue-500/30 text-white flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 lg:mb-3'
);
homeContent = homeContent.replace(
  'text-[10px] sm:text-xs font-bold text-blue-800/60 uppercase tracking-widest',
  'text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest'
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-pink-500 to-rose-600'",
  "color: 'text-pink-700', bg: 'bg-gradient-to-br from-pink-200 to-rose-300'" 
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-indigo-600'",
  "color: 'text-blue-700', bg: 'bg-gradient-to-br from-blue-200 to-indigo-300'"
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600'",
  "color: 'text-purple-700', bg: 'bg-gradient-to-br from-purple-200 to-fuchsia-300'"
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-emerald-500 to-teal-600'",
  "color: 'text-emerald-700', bg: 'bg-gradient-to-br from-emerald-200 to-teal-300'"
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-amber-500 to-orange-500'",
  "color: 'text-amber-800', bg: 'bg-gradient-to-br from-amber-200 to-orange-300'"
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-rose-500 to-red-600'",
  "color: 'text-rose-700', bg: 'bg-gradient-to-br from-rose-200 to-red-300'"
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-cyan-500 to-blue-600'",
  "color: 'text-cyan-800', bg: 'bg-gradient-to-br from-cyan-200 to-blue-300'"
);
homeContent = homeContent.replace(
  "color: 'text-white', bg: 'bg-gradient-to-br from-indigo-500 to-violet-600'",
  "color: 'text-indigo-700', bg: 'bg-gradient-to-br from-indigo-200 to-violet-300'"
);
homeContent = homeContent.replace(
  'className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30`}',
  'className={`w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/60`}'
);
homeContent = homeContent.replace(
  '<span className="text-xs font-bold text-white drop-shadow-sm">{btn.label}</span>',
  '<span className="text-xs font-bold text-slate-800 drop-shadow-sm">{btn.label}</span>'
);
fs.writeFileSync('src/views/HomeView.tsx', homeContent);


// CalendarView.tsx
let calContent = fs.readFileSync('src/views/CalendarView.tsx', 'utf8');
calContent = calContent.replace(' animate-marquee-hover', '');
calContent = calContent.replace(
  '<div className="font-bold text-blue-700 mb-1 overflow-hidden whitespace-nowrap">',
  '<div className="font-extrabold text-blue-900 mb-1 leading-tight text-wrap">'
);
calContent = calContent.replace(
  '<div className="marquee-content inline-block pr-4">',
  '<div className="inline-block break-words">'
);
calContent = calContent.replace(
  '{project.name} {project.name.length > 15 && <span className="pl-8">{project.name}</span>}',
  '{project.name}'
);
calContent = calContent.replace(
  'className="bg-blue-50/80 border border-blue-100/80 hover:bg-blue-100/50 rounded-lg p-2 text-xs group/item hover:shadow-sm transition-all cursor-pointer overflow-hidden"',
  'className="bg-blue-100 border border-blue-200 hover:bg-blue-200 rounded-lg p-2.5 text-xs group/item hover:shadow transition-all cursor-pointer"'
);
fs.writeFileSync('src/views/CalendarView.tsx', calContent);


// DataViews.tsx
let dataContent = fs.readFileSync('src/views/DataViews.tsx', 'utf8');

// Icons
dataContent = dataContent.replace(
  'w-16 h-16 bg-fuchsia-50 text-fuchsia-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-fuchsia-100',
  'w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg border border-fuchsia-500/20'
);
dataContent = dataContent.replace(
  'w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-rose-100',
  'w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg border border-rose-500/20'
);

// Smart QA:
dataContent = dataContent.replaceAll('bg-slate-100', 'bg-white');
dataContent = dataContent.replaceAll('bg-slate-50', 'bg-white');

fs.writeFileSync('src/views/DataViews.tsx', dataContent);


// SimpleViews.tsx
let simpleContent = fs.readFileSync('src/views/SimpleViews.tsx', 'utf8');

// Ebook Icon
simpleContent = simpleContent.replace(
  'w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-purple-100',
  'w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg border border-purple-500/20'
);

// Contact Directory Step 1 Icon
simpleContent = simpleContent.replace(
  'w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-blue-100',
  'w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg border border-blue-500/20'
);

// Eval Background (and Contact Directory background)
simpleContent = simpleContent.replaceAll('bg-slate-100', 'bg-white');
simpleContent = simpleContent.replaceAll('bg-slate-50', 'bg-white');

// Eval Icon
simpleContent = simpleContent.replace(
  'w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-blue-100',
  'w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-lg border border-blue-500/20'
);

fs.writeFileSync('src/views/SimpleViews.tsx', simpleContent);


// Sidebar.tsx
let sidebarContent = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sidebarContent = sidebarContent.replace(
  "isActive \n             ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'",
  "isActive \n             ? 'bg-blue-600 text-white font-bold shadow-md' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'"
);
sidebarContent = sidebarContent.replace(
  "className={isActive ? 'text-blue-600' : 'text-slate-400'}",
  "className={isActive ? 'text-white' : 'text-slate-400'}"
);
const darkModeRegex = /<div className="pt-2 mt-2 border-t border-slate-200">[\s\S]*?<Moon size=\{18\} className="text-slate-400" \/>[\s\S]*?โหมดกลางคืน[\s\S]*?<\/div>/;
sidebarContent = sidebarContent.replace(darkModeRegex, '');
fs.writeFileSync('src/components/Sidebar.tsx', sidebarContent);


// ManualView.tsx (User said: "สีพื้นของการ์ด และสีพื้นส่วนประเเมินผล ให้เปลี่ยนเป็นสีขาว")
// "10. สีพื้นของการ์ด และสีพื้นส่วนประเเมินผล ให้เปลี่ยนเป็นสีขาว" -> Already done via activeCard colors or bg-slate-100 for the main Manual container.
let manualContent = fs.readFileSync('src/views/ManualView.tsx', 'utf8');
manualContent = manualContent.replaceAll('bg-slate-100', 'bg-white');
fs.writeFileSync('src/views/ManualView.tsx', manualContent);

