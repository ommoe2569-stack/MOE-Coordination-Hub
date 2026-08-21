import fs from 'fs';
let content = fs.readFileSync('src/views/ManualView.tsx', 'utf8');

const newTabs = `  const tabs = [
    { 
      id: 'reg', num: '01', label: 'ลงทะเบียน (แจ้งรายชื่อ)', icon: UserPlus,
      activeCard: 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-emerald-100/50',
      inactiveCard: 'bg-white border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/30',
      activeIconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-200',
      inactiveIconBg: 'bg-emerald-50 text-emerald-500',
      activeText: 'text-emerald-700'
    },
    { 
      id: 'social', num: '02', label: 'Social Wall', icon: MessageSquare,
      activeCard: 'bg-gradient-to-br from-fuchsia-50 to-pink-50 border-fuchsia-200 shadow-fuchsia-100/50',
      inactiveCard: 'bg-white border-slate-100 hover:border-fuchsia-100 hover:bg-fuchsia-50/30',
      activeIconBg: 'bg-gradient-to-br from-fuchsia-400 to-pink-500 text-white shadow-md shadow-fuchsia-200',
      inactiveIconBg: 'bg-fuchsia-50 text-fuchsia-500',
      activeText: 'text-fuchsia-700'
    },
    { 
      id: 'qa', num: '03', label: 'Smart Q&A', icon: HelpCircle,
      activeCard: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-amber-100/50',
      inactiveCard: 'bg-white border-slate-100 hover:border-amber-100 hover:bg-amber-50/30',
      activeIconBg: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-200',
      inactiveIconBg: 'bg-amber-50 text-amber-500',
      activeText: 'text-amber-700'
    },
    { 
      id: 'contact', num: '04', label: 'Contact Directory', icon: Phone,
      activeCard: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-blue-100/50',
      inactiveCard: 'bg-white border-slate-100 hover:border-blue-100 hover:bg-blue-50/30',
      activeIconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-md shadow-blue-200',
      inactiveIconBg: 'bg-blue-50 text-blue-500',
      activeText: 'text-blue-700'
    },
    { 
      id: 'eval', num: '05', label: 'ประเมินผล', icon: ClipboardList,
      activeCard: 'bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-200 shadow-indigo-100/50',
      inactiveCard: 'bg-white border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30',
      activeIconBg: 'bg-gradient-to-br from-indigo-400 to-violet-500 text-white shadow-md shadow-indigo-200',
      inactiveIconBg: 'bg-indigo-50 text-indigo-500',
      activeText: 'text-indigo-700'
    },
  ];`;

content = content.replace(/const tabs = \[[\s\S]*?\];/, newTabs);

const newButtons = `      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={\`rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 border shadow-sm \${
                isActive 
                  ? tab.activeCard + ' ring-4 ring-white scale-105'
                  : tab.inactiveCard
              }\`}
            >
              <div className={\`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 \${isActive ? tab.activeIconBg + ' scale-110' : tab.inactiveIconBg}\`}>
                <tab.icon size={22} />
              </div>
              <div className="text-center mt-1">
                <p className={\`text-[10px] font-extrabold tracking-widest uppercase mb-1 \${isActive ? tab.activeText : 'text-slate-400'}\`}>{tab.num}</p>
                <p className={\`text-sm font-bold \${isActive ? 'text-slate-800' : 'text-slate-500'}\`}>{tab.label}</p>
              </div>
            </button>
          )
        })}
      </div>`;

content = content.replace(/<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">[\s\S]*?<\/div>\s*\{?\/\* Content Area \*\/?\}/, newButtons + "\n\n      {/* Content Area */}");

// Also update the colors for QA and Eval inside tabContent to match the new tabs
content = content.replace(/bgAccent: 'bg-emerald-50',\s*textColor: 'text-emerald-600',\s*borderColor: 'border-emerald-100',\s*hoverNumberBg: 'group-hover:bg-emerald-500 group-hover:border-emerald-500',\s*tipColor: 'text-emerald-900',/g, 
  "bgAccent: 'bg-amber-50',\n      textColor: 'text-amber-600',\n      borderColor: 'border-amber-100',\n      hoverNumberBg: 'group-hover:bg-amber-500 group-hover:border-amber-500',\n      tipColor: 'text-amber-900',");

content = content.replace(/bgAccent: 'bg-blue-50',\s*textColor: 'text-blue-600',\s*borderColor: 'border-blue-100',\s*hoverNumberBg: 'group-hover:bg-blue-600 group-hover:border-blue-600',\s*tipColor: 'text-blue-900',/g,
  "bgAccent: 'bg-indigo-50',\n      textColor: 'text-indigo-600',\n      borderColor: 'border-indigo-100',\n      hoverNumberBg: 'group-hover:bg-indigo-500 group-hover:border-indigo-500',\n      tipColor: 'text-indigo-900',");

// Wait, the regex might replace both contact and eval if they both use blue-50.
// Let's check the tabContent.
