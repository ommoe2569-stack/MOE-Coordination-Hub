import fs from 'fs';
let content = fs.readFileSync('src/views/CalendarView.tsx', 'utf8');

if (!content.includes('import { X } from')) {
  content = content.replace(
    "import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';",
    "import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, X, AlignLeft } from 'lucide-react';"
  );
}

if (!content.includes('const [selectedProject, setSelectedProject] = useState')) {
  content = content.replace(
    "const [currentDate, setCurrentDate] = useState(new Date());",
    "const [currentDate, setCurrentDate] = useState(new Date());\n  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);"
  );
}

// Add the modal HTML before the last closing div.
const modalCode = `
      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col">
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                 <CalendarIcon size={24} />
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-extrabold text-slate-800 mb-4 leading-tight">{selectedProject.name}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">เวลา</p>
                    <p className="font-semibold text-slate-700">{selectedProject.startTime} น.</p>
                  </div>
                </div>
                
                {selectedProject.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">สถานที่</p>
                      <p className="font-semibold text-slate-700">{selectedProject.location}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3 text-sm pt-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <AlignLeft size={16} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">รายละเอียด</p>
                      <p className="font-medium text-slate-600 leading-relaxed text-balance">
                         กิจกรรมโครงการ {selectedProject.name} จัดขึ้นเพื่อให้บุคลากรได้เข้าร่วมแลกเปลี่ยนความรู้และพัฒนาศักยภาพตามกำหนดการ
                      </p>
                    </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-blue-200"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
`;

content = content.replace(/<\/div>\n  \);\n}/, modalCode + "\n  );\n}");

// Replace onClick inside the day mapping and add marquee effect
content = content.replace(
  /<div key=\{project\.id\} className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 text-xs group\/item hover:shadow-md transition-all cursor-pointer">/g,
  `<div key={project.id} onClick={() => setSelectedProject(project)} className="bg-blue-50/80 border border-blue-100/80 hover:bg-blue-100/50 rounded-lg p-2 text-xs group/item hover:shadow-sm transition-all cursor-pointer overflow-hidden">`
);

content = content.replace(
  /<div className="font-bold text-indigo-700 truncate mb-1" title=\{project\.name\}>\n\s*\{project\.name\}\n\s*<\/div>/g,
  `<div className="font-bold text-blue-700 mb-1 overflow-hidden whitespace-nowrap">
                        <div className="inline-block transition-transform duration-[3000ms] ease-linear group-hover/item:-translate-x-1/2">
                          {project.name} {project.name.length > 20 && <span className="pl-4">{project.name}</span>}
                        </div>
                      </div>`
);

content = content.replace(/text-indigo-600\/80/g, 'text-blue-600/80');

fs.writeFileSync('src/views/CalendarView.tsx', content);
