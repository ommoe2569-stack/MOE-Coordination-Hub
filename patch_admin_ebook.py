import sys

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# Add EbookManagement component
start_other = content.find("function OtherDocumentManagement")
other_code = content[start_other:]

ebook_code = other_code.replace("OtherDocumentManagement", "EbookManagement")
ebook_code = ebook_code.replace("other_documents", "ebook_documents")
ebook_code = ebook_code.replace("เอกสารอื่น", "ผังแนวทางดำเนินงาน")
ebook_code = ebook_code.replace("<Files", "<BookOpen")

content = content + "\n\n" + ebook_code

# Add tab in sidebar
tab_insert = """          <button 
            onClick={() => setActiveTab('other_documents')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'other_documents' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <Files size={18} />
            จัดการเอกสารอื่น
          </button>
          <button 
            onClick={() => setActiveTab('ebook')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'ebook' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <BookOpen size={18} />
            จัดการผังแนวทางดำเนินงาน
          </button>"""

content = content.replace("""          <button 
            onClick={() => setActiveTab('other_documents')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'other_documents' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <Files size={18} />
            จัดการเอกสารอื่น
          </button>""", tab_insert)

# Add component to switch
switch_insert = """          {activeTab === 'other_documents' && <OtherDocumentManagement projects={projects} setProjects={setProjects} />}
          {activeTab === 'ebook' && <EbookManagement projects={projects} setProjects={setProjects} />}"""
content = content.replace("{activeTab === 'other_documents' && <OtherDocumentManagement projects={projects} setProjects={setProjects} />}", switch_insert)

# Ensure BookOpen is imported
if "BookOpen" not in content[:content.find("from 'lucide-react'")]:
    content = content.replace("Folder, FileText, Download", "Folder, FileText, Download, BookOpen")

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
