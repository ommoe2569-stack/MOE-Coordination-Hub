import sys

with open('src/views/SimpleViews.tsx', 'r') as f:
    content = f.read()

target = """export function EbookView({ activeProject }: { activeProject?: ProjectItem }) {
  const ebookLink = activeProject?.links?.ebook;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6">ผังแนวทางดำเนินงาน</h2>
      <div className="bg-white rounded-3xl p-24 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mb-4">
          <Folder size={40} />
        </div>
        {ebookLink ? (
          <>
            <p className="text-slate-600 font-semibold mb-6">มีผังแนวทางดำเนินงานสำหรับโครงการนี้</p>
            <button 
              onClick={() => window.open(ebookLink, '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-emerald-200"
            >
              <ExternalLink size={20} />
              เปิดผังแนวทางดำเนินงาน
            </button>
          </>
        ) : (
          <p className="text-slate-400 font-semibold">ยังไม่มีข้อมูลในขณะนี้</p>
        )}
      </div>
    </div>
  );
}"""

replacement = """export function EbookView({ activeProject }: { activeProject?: ProjectItem }) {
  const documents = activeProject?.ebook_documents || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-[#1e1b4b] dark:text-white mb-6">ผังแนวทางดำเนินงาน</h2>
      <div className="space-y-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
             <div key={doc.id} className="bg-white rounded-[14px] p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4 sm:gap-5">
                 <div className="w-[52px] h-[52px] bg-[#fdf4ff] text-[#c026d3] rounded-2xl flex items-center justify-center shrink-0">
                   <BookOpen size={26} strokeWidth={2} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-800 text-[15px] sm:text-base leading-tight mb-1">{doc.name}</h4>
                   <p className="text-[13px] text-slate-500 font-medium">{doc.date}</p>
                 </div>
               </div>
               <button 
                 onClick={() => window.open(doc.url, '_blank')}
                 className="bg-[#c026d3] hover:bg-fuchsia-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shrink-0 w-full sm:w-auto"
               >
                 <Download size={18} strokeWidth={2.5} />
                 ดาวน์โหลด / เปิดดู
               </button>
             </div>
          ))
        ) : (
          <div className="bg-white rounded-[14px] p-24 border border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-white text-slate-300 rounded-full flex items-center justify-center mb-4">
              <BookOpen size={40} />
            </div>
            <p className="text-slate-400 font-semibold">ยังไม่มีข้อมูลผังแนวทางดำเนินงานในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
}"""

content = content.replace(target, replacement)
if "BookOpen" not in content[:content.find("from 'lucide-react'")]:
    content = content.replace("Folder, FileText, Download", "Folder, FileText, Download, BookOpen")

with open('src/views/SimpleViews.tsx', 'w') as f:
    f.write(content)
