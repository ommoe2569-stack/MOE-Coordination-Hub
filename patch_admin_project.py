import sys

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# 1. Update useState
content = content.replace(
    "const [formData, setFormData] = useState({ name: '', startDate: '', startTime: '', location: '' });",
    "const [formData, setFormData] = useState({ name: '', startDate: '', endDate: '', startTime: '', location: '' });"
)

# 2. Update handleEdit
content = content.replace(
    "setFormData({ name: p.name, startDate: p.startDate || '', startTime: p.startTime || '', location: p.location || '' });",
    "setFormData({ name: p.name, startDate: p.startDate || '', endDate: p.endDate || '', startTime: p.startTime || '', location: p.location || '' });"
)

# 3. Update openAddForm
content = content.replace(
    "setFormData({ name: '', startDate: '', startTime: '', location: '' });\n    setEditingId(null);",
    "setFormData({ name: '', startDate: '', endDate: '', startTime: '', location: '' });\n    setEditingId(null);"
)

# 4. Update closeForm
content = content.replace(
    "setIsFormOpen(false);\n    setEditingId(null);\n    setFormData({ name: '', startDate: '', startTime: '', location: '' });",
    "setIsFormOpen(false);\n    setEditingId(null);\n    setFormData({ name: '', startDate: '', endDate: '', startTime: '', location: '' });"
)

# 5. Update form layout
target_form = """            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">วันที่เริ่มโครงการ</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">เวลาที่เริ่มโครงการ</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
            </div>"""

replacement_form = """            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">วันที่เริ่มโครงการ</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">วันสิ้นสุดโครงการ</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">เวลาที่เริ่มโครงการ</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
            </div>"""

content = content.replace(target_form, replacement_form)

# 6. Update view list display
target_list = """                {(p.startDate || p.startTime) && (
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-indigo-500"/> {formatThaiDate(p.startDate)}</span>
                    {p.startTime && <span className="flex items-center gap-1.5"><Clock size={12} className="text-indigo-500"/> {p.startTime} น.</span>}
                  </div>
                )}"""

replacement_list = """                {(p.startDate || p.endDate || p.startTime) && (
                  <div className="flex items-center gap-3">
                    {(p.startDate || p.endDate) && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-indigo-500"/> 
                        {p.startDate && p.endDate && p.startDate !== p.endDate 
                          ? `${formatThaiDate(p.startDate)} - ${formatThaiDate(p.endDate)}`
                          : formatThaiDate(p.startDate || p.endDate)}
                      </span>
                    )}
                    {p.startTime && <span className="flex items-center gap-1.5"><Clock size={12} className="text-indigo-500"/> {p.startTime} น.</span>}
                  </div>
                )}"""

content = content.replace(target_list, replacement_list)

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
