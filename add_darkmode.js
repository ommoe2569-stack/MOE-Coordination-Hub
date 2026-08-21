import fs from 'fs';
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

const replacement = `          <NavItem icon={HelpCircle} label="คู่มือการใช้งาน" view="manual" />
        </div>
        
        <div className="pt-2 mt-2 border-t border-slate-200">
          <button 
            className="w-full flex items-center justify-between px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <Moon size={18} className="text-slate-400" />
              <span className="text-sm font-medium">โหมดกลางคืน</span>
            </div>
            <div className="w-8 h-4 bg-slate-200 rounded-full flex items-center px-0.5">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </button>
        </div>
      </nav>
`;

content = content.replace(/<NavItem icon=\{HelpCircle\} label="คู่มือการใช้งาน" view="manual" \/>\s*<\/div>\s*<\/nav>/, replacement);

fs.writeFileSync('src/components/Sidebar.tsx', content);
