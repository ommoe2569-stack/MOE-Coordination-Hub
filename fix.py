with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

target = """        {deleteConfirmId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการลบข้อมูล</h3>
              <p className="text-slate-500 mb-6 text-sm">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
              
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setDeleteConfirmId(null)} 
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex-1"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm flex-1"
                >
                  ลบข้อมูล
                </button>
              </div>
            </div>
          </div>
        )}

      {!selectedProject ? ("""

replacement = """      {!selectedProject ? ("""

start_idx = content.find("function SystemManagement")
if start_idx != -1:
    end_idx = content.find("function DocumentManagement", start_idx)
    system_content = content[start_idx:end_idx]
    system_content = system_content.replace(target, replacement)
    content = content[:start_idx] + system_content + content[end_idx:]

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
