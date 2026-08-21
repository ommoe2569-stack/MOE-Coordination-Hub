import sys

with open('src/views/SimpleViews.tsx', 'r') as f:
    content = f.read()

# Fix imports
if "updateDoc" not in content[:content.find("from 'firebase/firestore'")]:
    content = content.replace("deleteDoc, doc } from 'firebase/firestore';", "deleteDoc, doc, updateDoc } from 'firebase/firestore';")

if "Edit" not in content[:content.find("from 'lucide-react'")]:
    content = content.replace("Trash2 } from 'lucide-react';", "Trash2, Edit } from 'lucide-react';")

# Find the ContactView component
start = content.find("export function ContactView")
if start != -1:
    end = content.find("export function EvaluationView", start)
    if end == -1:
        end = len(content)

    new_contact_view = """export function ContactView({ activeProject, isAdmin = true }: { activeProject?: ProjectItem, isAdmin?: boolean }) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', position: '', phone: '', email: '' });

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.position.trim()) return;
    
    try {
      if (editingId) {
        await updateDoc(doc(db, 'contacts', editingId), {
          ...formData,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'contacts'), {
          ...formData,
          projectId: activeProject?.id || null,
          createdAt: new Date().toISOString()
        });
      }
      setFormData({ name: '', position: '', phone: '', email: '' });
      setIsAdding(false);
      setEditingId(null);
    } catch (err) {
      console.error("Error saving contact", err);
    }
  };

  const handleEdit = (contact: any) => {
    setFormData({
      name: contact.name || '',
      position: contact.position || '',
      phone: contact.phone || '',
      email: contact.email || ''
    });
    setEditingId(contact.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
      await deleteDoc(doc(db, 'contacts', id));
    }
  };

  const filteredContacts = contacts.filter(c => 
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.position || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-extrabold text-[#1e1b4b] dark:text-white">ทำเนียบผู้ติดต่อ</h2>
        {isAdmin && (
          <button 
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', position: '', phone: '', email: '' }); }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm"
          >
            <Plus size={18} />
            เพิ่มผู้ติดต่อ
          </button>
        )}
      </div>

      {/* Pop up (Modal) */}
      {isAdding && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <button 
              onClick={() => { setIsAdding(false); setEditingId(null); }} 
              className="absolute top-4 right-4 text-slate-400 hover:bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6">{editingId ? 'แก้ไขรายชื่อผู้ติดต่อ' : 'เพิ่มรายชื่อผู้ติดต่อ'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">ชื่อ-สกุล <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="ระบุชื่อ-สกุล" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">ตำแหน่ง <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Briefcase size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input required type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="ระบุตำแหน่ง" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">เบอร์โทร</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="ระบุเบอร์โทร" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">อีเมล</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="ระบุอีเมล" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 gap-3 mt-4 border-t border-slate-100">
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                  ยกเลิก
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm">
                  <Save size={18} /> บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-200 mb-6">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="ค้นหาข้อมูลเจ้าหน้าที่ (ชื่อ-สกุล, ตำแหน่ง)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium transition-colors"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-sm">
                <th className="px-6 py-4 font-bold">ชื่อ-สกุล</th>
                <th className="px-6 py-4 font-bold">ตำแหน่ง</th>
                <th className="px-6 py-4 font-bold">เบอร์โทร</th>
                <th className="px-6 py-4 font-bold">อีเมล</th>
                {isAdmin && <th className="px-6 py-4 font-bold w-32 text-center">จัดการ</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                          <User size={16} />
                        </div>
                        {contact.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{contact.position}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {contact.phone ? (
                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600 flex items-center gap-2"><Phone size={14} className="text-slate-400"/> {contact.phone}</a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {contact.email ? (
                        <a href={`mailto:${contact.email}`} className="hover:text-blue-600 flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {contact.email}</a>
                      ) : '-'}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(contact)} className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="แก้ไข">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(contact.id)} className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="ลบ">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
                        <User size={32} />
                      </div>
                      <p className="font-semibold text-slate-500">ไม่พบข้อมูลเจ้าหน้าที่</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"""
    content = content[:start] + new_contact_view + content[end:]
    with open('src/views/SimpleViews.tsx', 'w') as f:
        f.write(content)
