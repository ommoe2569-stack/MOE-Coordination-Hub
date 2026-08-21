import sys

with open('src/views/DataViews.tsx', 'r') as f:
    content = f.read()

target = """        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-sm border border-emerald-100 mb-10">
          <h3 className="font-extrabold text-emerald-900 mb-5 text-sm uppercase tracking-wider">ส่งคำถาม (ไม่ระบุตัวตน)</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <textarea 
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="พิมพ์คำถามของคุณที่นี่..."
              className="w-full px-5 py-4 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-emerald-400 transition-all bg-white resize-none text-sm font-medium shadow-sm"
            ></textarea>
            
            <div className="flex justify-end mt-2">
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-sm shadow-emerald-200 flex items-center justify-center gap-2 text-sm whitespace-nowrap">
                ส่งคำถาม 
              </button>
            </div>
          </form>
        </div>"""

replacement = """        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-200 dark:border-slate-700 mb-10">
          <h3 className="font-extrabold text-slate-800 dark:text-white mb-5 text-sm uppercase tracking-wider">ส่งคำถาม (ไม่ระบุตัวตน)</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <textarea 
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="พิมพ์คำถามของคุณที่นี่..."
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white dark:bg-slate-700 dark:text-white dark:placeholder-slate-300 resize-none text-sm font-medium shadow-sm"
            ></textarea>
            
            <div className="flex justify-end mt-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm whitespace-nowrap">
                ส่งคำถาม 
              </button>
            </div>
          </form>
        </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/DataViews.tsx', 'w') as f:
        f.write(content)
    print("Patch applied successfully")
else:
    print("Target not found")

