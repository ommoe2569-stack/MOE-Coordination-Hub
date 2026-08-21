import fs from 'fs';
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

// I will completely rewrite the end of the `nav` block to fix this.
// Everything from `        <div className="pt-4 mt-2 border-t border-slate-200">`
const fixedNavEnd = `        <div className="pt-4 mt-2 border-t border-slate-200">
          <NavItem icon={Phone} label="Contact Directory" view="contact" />
          <NavItem icon={HelpCircle} label="Smart Q&A" view="qa" />
          <NavItem icon={ClipboardList} label="ประเมินการจัดงาน" view="evaluation" />
          <NavItem icon={HelpCircle} label="คู่มือการใช้งาน" view="manual" />
        </div>
      </nav>
      
      <div className="p-4 mt-auto">`;

const regex = /<div className="pt-4 mt-2 border-t border-slate-200">[\s\S]*?<div className="p-4 mt-auto">/;
content = content.replace(regex, fixedNavEnd);

// And update the isActive class again just in case it was lost during checkout
content = content.replace(
  "isActive \n             ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'",
  "isActive \n             ? 'bg-blue-600 text-white font-bold shadow-md' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'"
);
// Also the icon color inside NavItem
content = content.replace(
  "className={isActive ? 'text-white' : 'text-slate-400'}",
  "className={isActive ? 'text-white' : 'text-slate-400'}"
);
// Wait, I might have `bg-blue-50` still from checkout. Let's ensure:
content = content.replace(
  "isActive \n             ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'",
  "isActive \n             ? 'bg-blue-600 text-white font-bold shadow-md' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'"
);
// The exact string in my cat was:
content = content.replace(
  "isActive \n             ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'",
  "isActive \n             ? 'bg-blue-600 text-white font-bold shadow-md' \n             : 'text-slate-600 hover:bg-slate-100 font-medium'"
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
