import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { User, BookOpen, Download, UserCheck, ExternalLink, Folder, Lock, CheckSquare ,  Search ,  Plus ,  Phone ,  Mail ,  Briefcase ,  Save ,  X ,  Trash2, Edit, Upload } from 'lucide-react';
import { ProjectItem } from '../types';

export function RegisterView({ activeProject }: { activeProject?: ProjectItem }) {
  const registerLink = activeProject?.links?.register || '#';

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6">แบบแจ้งรายชื่อ</h2>
      <div className="bg-white rounded-3xl p-12 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
          <UserCheck size={36} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">แบบแจ้งรายชื่อผู้เข้าร่วมประชุม</h3>
        <p className="text-slate-500 mb-8 font-medium">กรุณากรอกข้อมูลแบบแจ้งรายชื่อ ผ่าน Google Sheet</p>
        <button 
          onClick={() => {
            if (registerLink !== '#') {
              window.open(registerLink, '_blank');
            } else {
              alert('ยังไม่ได้กำหนดลิงก์ Google Sheet สำหรับลงทะเบียน');
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-blue-200"
        >
          <ExternalLink size={20} />
          เปิด Google Sheet แจ้งรายชื่อ
        </button>
      </div>
    </div>
  );
}

export function EbookView({ activeProject }: { activeProject?: ProjectItem }) {
  const documents = activeProject?.ebook_documents || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-[#1e1b4b] dark:text-white mb-6">ผังแนวทางการดำเนินงาน</h2>
      <div className="space-y-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
             <div key={doc.id} className="bg-white rounded-[14px] p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4 sm:gap-5">
                 <div className="w-[52px] h-[52px] bg-[#eef4ff] text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0">
                   <BookOpen size={26} strokeWidth={2} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-800 text-[15px] sm:text-base leading-tight mb-1">{doc.name}</h4>
                   <p className="text-[13px] text-slate-500 font-medium">{doc.date}</p>
                 </div>
               </div>
               <button 
                 onClick={() => window.open(doc.url, '_blank')}
                 className="bg-[#1c5df9] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shrink-0 w-full sm:w-auto"
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
            <p className="text-slate-400 font-semibold">ยังไม่มีข้อมูลผังแนวทางการดำเนินงานในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContactView({ activeProject, isAdmin = true }: { activeProject?: ProjectItem, isAdmin?: boolean }) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', position: '', phone: '', email: '' });
  
  // States for sorting and deletion modal
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'}>({ key: 'name', direction: 'asc' });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
      // Skip header row if it exists
      const dataRows = rows.slice(1);
      
      const promises = dataRows.map(async (row) => {
        // row: [Name, Position, Phone, Email]
        const name = row[0] ? String(row[0]).trim() : '';
        const position = row[1] ? String(row[1]).trim() : '';
        const phone = row[2] ? String(row[2]).trim() : '';
        const email = row[3] ? String(row[3]).trim() : '';

        if (name) {
          return addDoc(collection(db, 'contacts'), {
            name,
            position,
            phone,
            email,
            projectId: activeProject?.id || null,
            createdAt: new Date().toISOString()
          });
        }
      });

      await Promise.all(promises);
      alert('นำเข้าข้อมูลสำเร็จ');
    } catch (err) {
      console.error("Error importing contacts", err);
      alert('เกิดข้อผิดพลาดในการนำเข้าข้อมูล โปรดตรวจสอบไฟล์ Excel');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    // Just fetch all and we will sort on client side for flexibility
    const q = query(collection(db, 'contacts'));
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

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      try {
        await deleteDoc(doc(db, 'contacts', deleteConfirmId));
        setDeleteConfirmId(null);
      } catch (err) {
        console.error("Error deleting contact", err);
      }
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort contacts
  const processedContacts = [...contacts]
    .filter(c => 
      (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.position || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = (a[sortConfig.key] || '').toLowerCase();
      const bVal = (b[sortConfig.key] || '').toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-extrabold text-[#1e1b4b] dark:text-white">Contact</h2>
        {isAdmin && (
          <div className="flex gap-3">
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              <Upload size={18} />
              {isImporting ? 'กำลังนำเข้า...' : 'นำเข้า Excel'}
            </button>
            <button 
              onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', position: '', phone: '', email: '' }); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm"
            >
              <Plus size={18} />
              เพิ่มผู้ติดต่อ
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการลบข้อมูล</h3>
            <p className="text-slate-500 mb-6 text-sm">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลเจ้าหน้าที่รายนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
            
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

      {/* Pop up (Modal) Add/Edit */}
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
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-200 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="ค้นหาข้อมูลเจ้าหน้าที่ (ชื่อ-สกุล, ตำแหน่ง)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium transition-colors"
          />
        </div>
        
        {/* Sort Dropdown Mobile only (Desktop can click headers) */}
        <div className="sm:hidden flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600">เรียงตาม:</span>
            <select 
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex-1"
              value={sortConfig.key}
              onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })}
            >
              <option value="name">ชื่อ-สกุล</option>
              <option value="position">ตำแหน่ง</option>
            </select>
            <button 
              onClick={() => setSortConfig({ key: sortConfig.key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl"
            >
              {sortConfig.direction === 'asc' ? '↓' : '↑'}
            </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-sm select-none">
                <th className="px-6 py-4 font-bold cursor-pointer hover:text-blue-600 hover:bg-slate-100 transition-colors" onClick={() => handleSort('name')}>
                  ชื่อ-สกุล {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 font-bold cursor-pointer hover:text-blue-600 hover:bg-slate-100 transition-colors" onClick={() => handleSort('position')}>
                  ตำแหน่ง {sortConfig.key === 'position' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 font-bold">เบอร์โทร</th>
                <th className="px-6 py-4 font-bold">อีเมล</th>
                {isAdmin && <th className="px-6 py-4 font-bold w-32 text-center">จัดการ</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processedContacts.length > 0 ? (
                processedContacts.map(contact => (
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
                          <button onClick={() => setDeleteConfirmId(contact.id)} className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="ลบ">
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
export function EvaluationView({ activeProject }: { activeProject?: ProjectItem }) {
  const evaluationLink = activeProject?.links?.evaluation || '#';

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6">ประเมินการจัดงาน</h2>
      <div className="bg-white rounded-3xl p-12 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-lg border border-blue-500/20">
          <CheckSquare size={36} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">แบบประเมินความพึงพอใจ</h3>
        <p className="text-slate-500 mb-3 text-sm leading-relaxed font-medium">ขอความกรุณาประเมินความพึงพอใจในการเข้าร่วมงาน<br/>เพื่อนำไปพัฒนาการจัดงานในครั้งต่อไป</p>
        <p className="text-xs text-slate-400 mb-8 font-semibold bg-white px-4 py-2 rounded-lg">ใช้เวลาเพียง 3-5 นาที · ข้อมูลของท่านจะถูกเก็บเป็นความลับ</p>
        <button 
          onClick={() => {
            if (evaluationLink !== '#') {
              window.open(evaluationLink, '_blank');
            } else {
              alert('ยังไม่ได้กำหนดลิงก์แบบประเมิน');
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-blue-200"
        >
          <ExternalLink size={20} />
          เปิดแบบประเมิน
        </button>
      </div>
    </div>
  );
}
