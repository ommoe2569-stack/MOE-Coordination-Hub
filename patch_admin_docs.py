import sys

with open('src/views/AdminView.tsx', 'r') as f:
    content = f.read()

# Replace confirm in DocumentManagement
target_docs = """function DocumentManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const [formData, setFormData] = useState({ name: '', date: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (docId: string) => {
    if (!selectedProjectId) return;
    if (confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
      setProjects(projects.map(p => {
        if (p.id === selectedProjectId) {
          return { ...p, documents: (p.documents || []).filter(d => d.id !== docId) };
        }
        return p;
      }));
    }
  };"""

replacement_docs = """function DocumentManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const [formData, setFormData] = useState({ name: '', date: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (!selectedProjectId || !deleteConfirmId) return;
    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, documents: (p.documents || []).filter(d => d.id !== deleteConfirmId) };
      }
      return p;
    }));
    setDeleteConfirmId(null);
  };

  const handleDelete = (docId: string) => {
    setDeleteConfirmId(docId);
  };"""

# Same for OtherDocumentManagement
target_other = """function OtherDocumentManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const [formData, setFormData] = useState({ name: '', date: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (docId: string) => {
    if (!selectedProjectId) return;
    if (confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
      setProjects(projects.map(p => {
        if (p.id === selectedProjectId) {
          return { ...p, other_documents: (p.other_documents || []).filter(d => d.id !== docId) };
        }
        return p;
      }));
    }
  };"""

replacement_other = """function OtherDocumentManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const [formData, setFormData] = useState({ name: '', date: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (!selectedProjectId || !deleteConfirmId) return;
    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, other_documents: (p.other_documents || []).filter(d => d.id !== deleteConfirmId) };
      }
      return p;
    }));
    setDeleteConfirmId(null);
  };

  const handleDelete = (docId: string) => {
    setDeleteConfirmId(docId);
  };"""

modal_code_docs = """        {deleteConfirmId && (
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

content = content.replace(target_docs, replacement_docs)
content = content.replace(target_other, replacement_other)

# Insert modal for DocumentManagement
if "      {!selectedProject ? (" in content:
    content = content.replace("      {!selectedProject ? (", modal_code_docs)

with open('src/views/AdminView.tsx', 'w') as f:
    f.write(content)
