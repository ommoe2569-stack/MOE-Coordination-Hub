import sys
import re

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# 1. Ensure Files icon is imported
if 'Files' not in content:
    content = content.replace("import { LayoutDashboard, Users, Calendar as CalendarIcon, Settings, Search, Plus, Edit, Trash2, X, Check, Save, FileText, Upload, Link, MessageSquare } from 'lucide-react';", "import { LayoutDashboard, Users, Calendar as CalendarIcon, Settings, Search, Plus, Edit, Trash2, X, Check, Save, FileText, Upload, Link, MessageSquare, Files } from 'lucide-react';")

# 2. Add menu toggle
content = content.replace("{ key: 'ebook', label: 'ผังแนวทาง' },", "{ key: 'ebook', label: 'ผังแนวทาง' },\n    { key: 'other_docs', label: 'เอกสารอื่น' },")
content = content.replace("{ key: 'ebook', label: 'ลิงก์ผังแนวทางดำเนินงาน' },", "{ key: 'ebook', label: 'ลิงก์ผังแนวทางดำเนินงาน' },\n    { key: 'other_docs', label: 'ลิงก์เอกสารอื่น' },") # Note: other_docs isn't a string link in ProjectItem though, it's an array of items. The original download is "ลิงก์ดาวน์โหลดเอกสาร"? 
# Wait, let's see how 'download' is handled in features.
# Let's check if there is "ลิงก์ดาวน์โหลดเอกสาร" in AdminView.

# 3. Add to Active Tab menu
tab_btn = """          <button 
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'documents' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <FileText size={18} />
            จัดการผังที่นั่ง-รายชื่อ
          </button>"""

other_tab_btn = """          <button 
            onClick={() => setActiveTab('other_documents')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'other_documents' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <Files size={18} />
            จัดการเอกสารอื่น
          </button>"""

content = content.replace(tab_btn, tab_btn + "\n" + other_tab_btn)

# 4. Add the component to render
render_doc = "{activeTab === 'documents' && <DocumentManagement projects={projects} setProjects={setProjects} />}"
render_other = "{activeTab === 'other_documents' && <OtherDocumentManagement projects={projects} setProjects={setProjects} />}"

content = content.replace(render_doc, render_doc + "\n          " + render_other)

# 5. Duplicate DocumentManagement into OtherDocumentManagement
start = content.find("function DocumentManagement")
end = content.find("function SystemManagement", start) # wait, SystemManagement might be before or after.
if end == -1:
    end = len(content)

# To be safe, let's use a regex or string extraction
doc_mgmt_code = content[start:] # assuming it's the last function or we can just find its end by matching brace.
# Let's find end of DocumentManagement by counting braces.
def find_end(text, start_idx):
    idx = text.find('{', start_idx)
    if idx == -1: return -1
    count = 1
    idx += 1
    while count > 0 and idx < len(text):
        if text[idx] == '{': count += 1
        elif text[idx] == '}': count -= 1
        idx += 1
    return idx

end_idx = find_end(content, start)
doc_mgmt_code = content[start:end_idx]

other_mgmt_code = doc_mgmt_code.replace("DocumentManagement", "OtherDocumentManagement")
other_mgmt_code = other_mgmt_code.replace(".documents", ".other_documents")
other_mgmt_code = other_mgmt_code.replace("documents:", "other_documents:")
other_mgmt_code = other_mgmt_code.replace("const documents =", "const other_documents =")
other_mgmt_code = other_mgmt_code.replace("documents.length", "other_documents.length")
other_mgmt_code = other_mgmt_code.replace("documents.map", "other_documents.map")
other_mgmt_code = other_mgmt_code.replace("ผังที่นั่ง-รายชื่อ", "เอกสารอื่น")
other_mgmt_code = other_mgmt_code.replace("<FileText", "<Files")

# Insert it at the end of the file
content = content + "\n\n" + other_mgmt_code

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)

