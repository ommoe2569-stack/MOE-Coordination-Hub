import React, { useState } from 'react';
import { Lock, BookOpen, Users, Calendar, LayoutDashboard, Shield, Edit, Trash2, Plus, LogOut, Briefcase, Clock, MapPin, Search, ChevronDown, Check, FileText , Files } from 'lucide-react';
import { SessionItem, ProjectItem, UserItem, UserRole } from '../types';

interface AdminViewProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  sessions: SessionItem[];
  setSessions: (sessions: SessionItem[]) => void;
  projects: ProjectItem[];
  setProjects: (projects: ProjectItem[]) => void;
  users: UserItem[];
  setUsers: (users: UserItem[]) => void;
}

export default function AdminView({ userRole, setUserRole, sessions, setSessions, projects, setProjects, users, setUsers }: AdminViewProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      setUserRole('admin');
      setError('');
    } else if (password === 'staff1234') {
      setUserRole('staff');
      setError('');
    } else {
      setError('รหัสผ่านไม่ถูกต้อง');
    }
  };

  if (userRole === 'guest') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mt-12">
          <div className="bg-slate-200 rounded-3xl p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300 w-full max-w-md">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-slate-200">
                <Lock size={28} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">เข้าสู่ระบบ (Admin/Staff)</h3>
            </div>
            
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="รหัสผ่าน"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-indigo-500 transition-colors bg-slate-100 font-medium text-center tracking-widest text-slate-900 dark:text-slate-900"
                />
                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm">
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-200 p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-xl flex items-center justify-center shadow-md">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">ระบบจัดการหลังบ้าน (Admin Panel)</h2>
            <p className="text-sm text-slate-500 font-medium">จัดการผู้ใช้งาน, เซสชั่น และการตั้งค่าระบบ</p>
          </div>
        </div>
        <button 
          onClick={() => { setUserRole('guest'); setPassword(''); }}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors bg-slate-100 hover:bg-indigo-50 px-4 py-2.5 rounded-xl font-bold text-sm border border-slate-300 hover:border-indigo-100"
        >
          <LogOut size={16} />
          ออกจากระบบ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Admin Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-100 border border-slate-300'}`}
          >
            <Briefcase size={18} />
            จัดการโครงการ
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-100 border border-slate-300'}`}
          >
            <Users size={18} />
            กำหนดสิทธิ์ผู้ใช้งาน
          </button>
          <button 
            onClick={() => setActiveTab('sessions')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'sessions' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-100 border border-slate-300'}`}
          >
            <Calendar size={18} />
            การกำหนด Session
          </button>
          <button 
            onClick={() => setActiveTab('menus')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'menus' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-100 border border-slate-300'}`}
          >
            <LayoutDashboard size={18} />
            จัดการระบบ/เมนู
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'documents' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-100 border border-slate-300'}`}
          >
            <FileText size={18} />
            จัดการผังที่นั่ง-รายชื่อ
          </button>
          <button 
            onClick={() => setActiveTab('other_documents')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'other_documents' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-100 border border-slate-300'}`}
          >
            <Files size={18} />
            จัดการเอกสารที่เกี่ยวข้อง
          </button>
          <button 
            onClick={() => setActiveTab('ebook')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'ebook' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-100 border border-slate-300'}`}
          >
            <BookOpen size={18} />
            จัดการผังแนวทางดำเนินงาน
          </button>
        </div>

        {/* Admin Content */}
        <div className="md:col-span-3">
          {activeTab === 'projects' && <ProjectManagement projects={projects} setProjects={setProjects} users={users} setUsers={setUsers} />}
          {activeTab === 'users' && <UserManagement users={users} setUsers={setUsers} projects={projects} />}
          {activeTab === 'sessions' && <SessionManagement sessions={sessions} setSessions={setSessions} projects={projects} />}
          {activeTab === 'menus' && <SystemManagement projects={projects} setProjects={setProjects} />}
          {activeTab === 'documents' && <DocumentManagement projects={projects} setProjects={setProjects} />}
                    {activeTab === 'other_documents' && <OtherDocumentManagement projects={projects} setProjects={setProjects} />}
          {activeTab === 'ebook' && <EbookManagement projects={projects} setProjects={setProjects} />}
        </div>
      </div>
    </div>
  );
}

function UserManagement({ users, setUsers, projects }: { users: UserItem[], setUsers: (u: UserItem[]) => void, projects: ProjectItem[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User', status: 'Active', projectId: '' });
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');

  const filteredUsers = users.filter(u => u.projectId === selectedProjectId);

  const handleEdit = (u: UserItem) => {
    setEditingId(u.id);
    setIsAddingUser(false);
    setFormData({ name: u.name, email: u.email, role: u.role, status: u.status, projectId: u.projectId || selectedProjectId });
  };

  const handleAddClick = () => {
    if (!selectedProjectId) {
      alert('กรุณาเลือกโครงการหรือเพิ่มโครงการก่อนเพิ่มผู้ใช้งาน');
      return;
    }
    setEditingId(null);
    setIsAddingUser(true);
    setFormData({ name: '', email: '', role: 'User', status: 'Active', projectId: selectedProjectId });
  };

  const handleSave = () => {
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
      setEditingId(null);
    } else if (isAddingUser) {
      if (!formData.name || !formData.email) return;
      const newUser = {
        id: Date.now(),
        ...formData
      };
      setUsers([newUser, ...users]);
      setIsAddingUser(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAddingUser(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('คุณต้องการลบผู้ใช้งานนี้หรือไม่?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="bg-slate-200 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
           <h3 className="font-extrabold text-slate-800 text-lg mb-1">กำหนดสิทธิ์ผู้ใช้งาน</h3>
           <p className="text-xs font-semibold text-slate-500">จัดการข้อมูลผู้ใช้งานและระดับการเข้าถึงแยกตามโครงการ</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchableProjectDropdown
            projects={projects}
            value={selectedProjectId}
            onChange={(id) => {
              setSelectedProjectId(id);
              setIsAddingUser(false);
              setEditingId(null);
            }}
          />
          <button onClick={handleAddClick} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
            <Plus size={16} /> เพิ่มผู้ใช้งาน
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-100 text-[11px] text-slate-500 uppercase tracking-widest">
              <th className="py-4 px-5 font-bold rounded-tl-xl border-b border-slate-300">ชื่อ-นามสกุล</th>
              <th className="py-4 px-5 font-bold border-b border-slate-300">อีเมล</th>
              <th className="py-4 px-5 font-bold border-b border-slate-300">สิทธิ์การใช้งาน</th>
              <th className="py-4 px-5 font-bold border-b border-slate-300">สถานะ</th>
              <th className="py-4 px-5 font-bold text-right rounded-tr-xl border-b border-slate-300">จัดการ</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 font-medium text-sm">ไม่มีผู้ใช้งานสำหรับโครงการนี้</td>
              </tr>
            )}
            {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-100/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-700">{u.name}</td>
                  <td className="py-4 px-5 text-slate-500 font-medium">{u.email}</td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-xs text-slate-600 px-3 py-1.5 bg-slate-200 rounded-lg border border-slate-200/60">{u.role}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button onClick={() => handleEdit(u)} className="text-indigo-500 hover:text-indigo-700 p-1.5 hover:bg-indigo-50 rounded-lg transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(u.id)} className="text-indigo-500 hover:text-indigo-700 p-1.5 hover:bg-indigo-50 rounded-lg transition-colors ml-1"><Trash2 size={16} /></button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {(isAddingUser || editingId !== null) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={handleCancel}></div>
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative z-10 shadow-2xl">
            <h3 className="text-xl font-black text-slate-800 mb-6">
              {isAddingUser ? 'เพิ่มผู้ใช้งานใหม่' : 'แก้ไขผู้ใช้งาน'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ชื่อ-นามสกุล</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors" placeholder="ระบุชื่อ-นามสกุล" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">อีเมล</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors" placeholder="ระบุอีเมล" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">สิทธิ์การใช้งาน</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-100 border border-slate-300 text-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors">
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">สถานะ</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-100 border border-slate-300 text-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={handleCancel} className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-200 transition-colors">
                ยกเลิก
              </button>
              <button onClick={handleSave} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors">
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SessionManagement({ sessions, setSessions, projects }: { sessions: SessionItem[], setSessions: (s: SessionItem[]) => void, projects: ProjectItem[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', time: '', room: '', projectId: '' });
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');


  const formatThaiDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      return `${parseInt(day)} ${thaiMonths[parseInt(month) - 1]} ${parseInt(year) + 543}`;
    } catch {
      return dateString;
    }
  };

  const filteredSessions = sessions.filter(s => s.projectId === selectedProjectId);

  const handleEdit = (s: SessionItem) => {
    setEditingId(s.id);
    setIsAddingSession(false);
    setFormData({ title: s.title, date: s.date || '', time: s.time, room: s.room, projectId: s.projectId || selectedProjectId });
  };

  const handleAddClick = () => {
    if (!selectedProjectId) {
      alert('กรุณาเลือกโครงการหรือเพิ่มโครงการก่อนเพิ่ม Session');
      return;
    }
    setEditingId(null);
    setIsAddingSession(true);
    setFormData({ title: '', date: projects.find(p => p.id === selectedProjectId)?.startDate || '', time: '', room: '', projectId: selectedProjectId });
  };

  const handleSave = () => {
    if (editingId) {
      setSessions(sessions.map(s => s.id === editingId ? { ...s, ...formData } : s));
      setEditingId(null);
    } else if (isAddingSession) {
      if (!formData.title || !formData.time) return;
      const newSession: SessionItem = {
        id: `s-${Date.now()}`,
        tag: 'ทั่วไป',
        tagColor: 'blue',
        title: formData.title,
        date: formData.date,
        time: formData.time,
        room: formData.room,
        isActive: false,
        projectId: formData.projectId
      };
      setSessions([...sessions, newSession]);
      setIsAddingSession(false);
    }
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleCancel = () => {
    setEditingId(null);
    setIsAddingSession(false);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      setSessions(sessions.filter(s => s.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  return (
    <div className="bg-slate-200 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการลบข้อมูล</h3>
            <p className="text-slate-500 mb-6 text-sm">คุณแน่ใจหรือไม่ว่าต้องการลบ Session นี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
            
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setDeleteConfirmId(null)} 
                className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-200 hover:bg-slate-200 rounded-xl transition-colors flex-1"
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
           <h3 className="font-extrabold text-slate-800 text-lg mb-1">การกำหนด Session</h3>
           <p className="text-xs font-semibold text-slate-500">จัดการหัวข้อการบรรยายแยกตามโครงการ</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchableProjectDropdown
            projects={projects}
            value={selectedProjectId}
            onChange={(id) => {
              setSelectedProjectId(id);
              setIsAddingSession(false);
              setEditingId(null);
            }}
          />
          <button onClick={handleAddClick} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
            <Plus size={16} /> เพิ่ม Session
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {isAddingSession && (
          <div className="flex flex-col p-5 rounded-2xl border bg-indigo-50/30 border-indigo-100 transition-colors">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">หัวข้อการบรรยาย</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น การบรรยายพิเศษ เรื่อง..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">วันที่ (ถ้ามีหลายวัน)</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">เวลา</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="เช่น 09:00 - 10:30"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ห้องประชุม</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="เช่น ห้องประชุม 1"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <button onClick={handleCancel} className="px-4 py-2 rounded-xl text-slate-600 bg-slate-200 hover:bg-slate-200 font-bold text-xs transition-colors">
                  ยกเลิก
                </button>
                <button onClick={handleSave} className="px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-bold text-xs transition-colors shadow-sm shadow-indigo-200">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        )}
        {filteredSessions.length === 0 && !isAddingSession && (
          <div className="text-center py-8 text-slate-500 font-medium text-sm">
            ไม่มี Session สำหรับโครงการนี้
          </div>
        )}
        {filteredSessions.map((s) => (
          <div key={s.id} className="flex flex-col p-5 rounded-2xl border bg-slate-100 border-slate-300 transition-colors group hover:border-indigo-200">
            {editingId === s.id ? (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">หัวข้อการบรรยาย</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">วันที่ (ถ้ามีหลายวัน)</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">เวลา</label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="เช่น 09:00 - 10:30"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ห้องประชุม</label>
                    <input
                      type="text"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                    บันทึก
                  </button>
                  <button onClick={handleCancel} className="bg-slate-200 border border-slate-300 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h4 className="font-bold text-slate-800 text-sm mb-2">{s.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-slate-500 font-semibold">
                     {s.date && <span className="flex items-center gap-1.5 bg-slate-200 px-2.5 py-1 rounded-md border border-slate-300"><Calendar size={12} className="text-indigo-500"/> {formatThaiDate(s.date)}</span>}
                     <span className="flex items-center gap-1.5 bg-slate-200 px-2.5 py-1 rounded-md border border-slate-300"><Clock size={12} className="text-indigo-500"/> {s.time}</span>
                     <span className="flex items-center gap-1.5 bg-slate-200 px-2.5 py-1 rounded-md border border-slate-300"><LayoutDashboard size={12} className="text-indigo-500"/> {s.room}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(s)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const [editingLinkKey, setEditingLinkKey] = useState<string | null>(null);
  const [linkInputTemp, setLinkInputTemp] = useState<string>('');

  const handleLinkSave = (key: string) => {
    handleLinkChange(key, linkInputTemp);
    setEditingLinkKey(null);
  };

  const handleLinkChange = (key: string, value: string) => {
    if (!selectedProjectId) return;
    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          links: {
            ...(p.links || {}),
            [key]: value
          }
        };
      }
      return p;
    }));
  };

  const handleFeatureToggle = (key: string, checked: boolean) => {
    if (!selectedProjectId) return;
    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          features: {
            ...(p.features || {}),
            [key]: checked
          }
        };
      }
      return p;
    }));
  };

  const featureConfigs = [
    { key: 'calendar', label: 'ปฏิทินกิจกรรม' },
    { key: 'register', label: 'แบบแจ้งรายชื่อ' },
    { key: 'download', label: 'ผังที่นั่ง-รายชื่อ' },
    { key: 'ebook', label: 'ผังแนวทาง' },
    { key: 'other_docs', label: 'เอกสารที่เกี่ยวข้อง' },
    { key: 'qa', label: 'Q&A' },
    { key: 'gallery', label: 'แกลเลอรี่' },
    { key: 'evaluation', label: 'ประเมินผล' },
    { key: 'contact', label: 'Contact' },
  ];

  const linkConfigs = [
    { key: 'register', label: 'ลิงก์แบบแจ้งรายชื่อ (Google Sheet)' },
    { key: 'ebook', label: 'ลิงก์ผังแนวทางดำเนินงาน' },
    { key: 'other_docs', label: 'ลิงก์เอกสารที่เกี่ยวข้อง' },
    { key: 'evaluation', label: 'ลิงก์แบบประเมิน' },
    { key: 'gallery', label: 'ลิงก์คลังภาพ (Gallery)' },
    { key: 'qa', label: 'ลิงก์ Smart Q&A' },
  ];

  return (
    <div className="bg-slate-200 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg mb-1">จัดการระบบและลิงก์ข้อมูล</h3>
          <p className="text-sm text-slate-500 font-medium">กำหนดโฟลเดอร์หรือลิงก์ปลายทางสำหรับเมนูต่างๆ แยกตามโครงการ</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <SearchableProjectDropdown
            projects={projects}
            value={selectedProjectId}
            onChange={(id) => setSelectedProjectId(id)}
          />
        </div>
      </div>
      
      {!selectedProject ? (
        <div className="text-center py-8 text-slate-500 font-medium text-sm">
          กรุณาเลือกโครงการที่ต้องการจัดการ
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {linkConfigs.map((config) => {
              const currentValue = (selectedProject.links as any)?.[config.key] || '';
              const isEditing = editingLinkKey === config.key;

              return (
                <div key={config.key} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-300 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {isEditing ? (
                    <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
                       <input
                        type="text"
                        value={linkInputTemp}
                        onChange={(e) => setLinkInputTemp(e.target.value)}
                        placeholder={`ระบุ URL ${config.label}...`}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-100 text-slate-800"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleLinkSave(config.key)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm whitespace-nowrap">
                          บันทึก
                        </button>
                        <button onClick={() => setEditingLinkKey(null)} className="bg-slate-200 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-indigo-50/50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100/50">
                          <FileText size={24} strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-800 text-sm sm:text-base truncate">{config.label}</h4>
                          <div className="flex items-center gap-3 mt-1.5">
                            {currentValue ? (
                              <button 
                                onClick={() => window.open(currentValue, '_blank')}
                                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1.5"
                              >
                                ทดสอบลิงก์
                              </button>
                            ) : (
                              <span className="text-sm font-medium text-slate-400">
                                ยังไม่ได้ระบุลิงก์
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => {
                            setEditingLinkKey(config.key);
                            setLinkInputTemp(currentValue);
                          }}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm"
                        >
                          <Edit size={18} strokeWidth={1.5} />
                        </button>
                        <button 
                          onClick={() => {
                            if (currentValue && confirm('ต้องการลบลิงก์นี้หรือไม่?')) {
                              handleLinkChange(config.key, '');
                            }
                          }}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-300">
            <h4 className="font-bold text-slate-800 mb-4">การแสดงผลเมนูหลัก (สำหรับผู้ใช้งาน)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {featureConfigs.map(config => {
                const isEnabled = selectedProject.features?.[config.key] !== false; // Default true
                return (
                  <label key={config.key} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-300 cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="text-sm font-bold text-slate-700">{config.label}</span>
                    <div className="relative inline-block w-10 h-6 shrink-0 transition-colors duration-200 ease-in-out">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={isEnabled}
                        onChange={(e) => handleFeatureToggle(config.key, e.target.checked)}
                      />
                      <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-500 transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectManagement({ 
  projects, 
  setProjects,
  users,
  setUsers
}: { 
  projects: ProjectItem[], 
  setProjects: (p: ProjectItem[]) => void,
  users: UserItem[],
  setUsers: (u: UserItem[]) => void
}) {
  const [formData, setFormData] = useState({ name: '', startDate: '', endDate: '', startTime: '', location: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggle = (id: string, currentStatus: boolean) => {
    if (!currentStatus) {
      setProjects(projects.map(p => ({ ...p, isActive: p.id === id })));
    } else {
      setProjects(projects.map(p => ({ ...p, isActive: false })));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณต้องการลบโครงการนี้ใช่หรือไม่?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleEdit = (p: ProjectItem) => {
    setFormData({ name: p.name, startDate: p.startDate || '', endDate: p.endDate || '', startTime: p.startTime || '', location: p.location || '' });
    setEditingId(p.id);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setFormData({ name: '', startDate: '', endDate: '', startTime: '', location: '' });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', startDate: '', endDate: '', startTime: '', location: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      if (editingId) {
        setProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } : p));
      } else {
        const newProject: ProjectItem = {
          id: Date.now().toString(),
          ...formData,
          isActive: projects.length === 0,
        };
        setProjects([...projects, newProject]);
        
        // เพิ่มผู้ใช้งาน Admin และ Staff เริ่มต้นให้กับโครงการใหม่โดยอัตโนมัติ
        const defaultUsers: UserItem[] = [
          { id: Date.now() + 1, name: 'ผู้ดูแลระบบ (Admin)', email: 'admin@agency.go.th', role: 'Admin', status: 'Active', projectId: newProject.id },
          { id: Date.now() + 2, name: 'เจ้าหน้าที่ (Staff)', email: 'staff@agency.go.th', role: 'Staff', status: 'Active', projectId: newProject.id }
        ];
        setUsers([...users, ...defaultUsers]);
      }
      closeForm();
    }
  };

  const formatThaiDate = (dateString?: string) => {
    if (!dateString) return 'ยังไม่ระบุวันที่';
    try {
      const [year, month, day] = dateString.split('-');
      const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      return `${parseInt(day)} ${thaiMonths[parseInt(month) - 1]} ${parseInt(year) + 543}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-slate-200 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
           <h3 className="font-extrabold text-slate-800 text-lg mb-1">จัดการโครงการ</h3>
           <p className="text-xs font-semibold text-slate-500">จัดการข้อมูลโครงการที่ต้องการแสดงบนหน้าหลัก (เปิดใช้งานได้ครั้งละ 1 โครงการ)</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={openAddForm}
            className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Plus size={16} /> เพิ่มโครงการ
          </button>
        )}
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-6 bg-slate-100 p-5 rounded-2xl border border-slate-300">
          <h4 className="font-bold text-slate-700 mb-4">{editingId ? 'แก้ไขโครงการ' : 'เพิ่มโครงการใหม่'}</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">ชื่อโครงการ <span className="text-indigo-500">*</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ระบุชื่อโครงการ..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                required
                autoFocus
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">วันที่เริ่มโครงการ</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">วันสิ้นสุดโครงการ</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">เวลาที่เริ่มโครงการ</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">สถานที่ประชุม</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="ระบุสถานที่ประชุม..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                บันทึก
              </button>
              <button type="button" onClick={closeForm} className="bg-slate-200 border border-slate-300 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-colors group ${p.isActive ? 'bg-indigo-50/40 border-indigo-200' : 'bg-slate-200 border-slate-300 opacity-80'}`}>
            <div className="flex-1 pr-4 mb-4 md:mb-0">
              <h4 className={`font-extrabold text-base md:text-lg leading-relaxed text-balance break-words mb-3 ${p.isActive ? 'text-indigo-900' : 'text-slate-800'}`}>{p.name}</h4>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold mb-3">
                {(p.startDate || p.endDate || p.startTime) && (
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
                )}
                {p.location && (
                  <div className="flex items-center gap-1.5 border-l border-slate-300 pl-3">
                    <MapPin size={12} className="text-indigo-500" /> {p.location}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs">
                 <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider ${p.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>{p.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={p.isActive} onChange={() => handleToggle(p.id, p.isActive)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-200 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && !isFormOpen && (
          <div className="text-center py-8 text-slate-500 font-medium text-sm">
            ยังไม่มีโครงการในระบบ
          </div>
        )}
      </div>
    </div>
  );
}

function SearchableProjectDropdown({ 
  projects, 
  value, 
  onChange 
}: { 
  projects: ProjectItem[]; 
  value: string; 
  onChange: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedProject = projects.find(p => p.id === value);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-[200px] sm:w-[250px] px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-100 text-slate-800 truncate"
      >
        <span className="truncate mr-2">
          {projects.length === 0 ? "ไม่มีโครงการ" : selectedProject ? selectedProject.name : "เลือกโครงการ..."}
        </span>
        <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute z-50 top-full mt-2 w-[300px] sm:w-[350px] right-0 sm:left-0 bg-slate-200 rounded-xl shadow-xl border border-slate-300 overflow-hidden">
            <div className="p-2 border-b border-slate-50">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหาโครงการ..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto p-1">
              {filteredProjects.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-500">ไม่พบโครงการที่ค้นหา</div>
              ) : (
                filteredProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onChange(p.id);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${value === p.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 text-slate-700 font-medium'}`}
                  >
                    <span className="truncate pr-4">{p.name}</span>
                    {value === p.id && <Check size={14} className="shrink-0 text-indigo-600" />}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DocumentManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
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
  };

  const handleEdit = (doc: { id: string; name: string; date: string; url: string }) => {
    setFormData({ name: doc.name, date: doc.date, url: doc.url });
    setEditingId(doc.id);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setFormData({ name: '', date: '', url: '' });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', date: '', url: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !formData.name.trim() || !formData.url.trim()) return;

    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        const currentDocs = p.documents || [];
        if (editingId) {
          return { ...p, documents: currentDocs.map(d => d.id === editingId ? { ...d, ...formData } : d) };
        } else {
          const newDoc = { id: Date.now().toString(), ...formData };
          return { ...p, documents: [...currentDocs, newDoc] };
        }
      }
      return p;
    }));
    closeForm();
  };

  const documents = selectedProject?.documents || [];

  return (
    <div className="bg-slate-200 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg mb-1">จัดการผังที่นั่ง-รายชื่อ</h3>
          <p className="text-sm text-slate-500 font-medium">เพิ่มหรือแก้ไขลิงก์ไฟล์ผังที่นั่ง-รายชื่อแยกตามโครงการ</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <SearchableProjectDropdown
            projects={projects}
            value={selectedProjectId}
            onChange={(id) => {
              setSelectedProjectId(id);
              setIsFormOpen(false);
              setEditingId(null);
            }}
          />
          <button onClick={openAddForm} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
            <Plus size={16} /> เพิ่มผังที่นั่ง-รายชื่อ
          </button>
        </div>
      </div>

        {deleteConfirmId && (
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
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-200 hover:bg-slate-200 rounded-xl transition-colors flex-1"
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

      {!selectedProject ? (
        <div className="text-center py-8 text-slate-500 font-medium text-sm">
          กรุณาเลือกโครงการที่ต้องการจัดการ
        </div>
      ) : (
        <>
          {isFormOpen && (
            <form onSubmit={handleSubmit} className="mb-6 bg-slate-100 p-5 rounded-2xl border border-slate-300">
              <h4 className="font-bold text-slate-700 mb-4">{editingId ? 'แก้ไขผังที่นั่ง-รายชื่อ' : 'เพิ่มผังที่นั่ง-รายชื่อใหม่'}</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ชื่อผังที่นั่ง-รายชื่อ <span className="text-indigo-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ระบุชื่อผังที่นั่ง-รายชื่อ..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ลิงก์ URL ของไฟล์ <span className="text-indigo-500">*</span></label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">วันที่ (เช่น 14/8/2569)</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="ระบุวันที่..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                    บันทึก
                  </button>
                  <button type="button" onClick={closeForm} className="bg-slate-200 border border-slate-300 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
                    ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {documents.length === 0 && !isFormOpen ? (
              <div className="text-center py-8 text-slate-500 font-medium text-sm border-2 border-dashed border-slate-300 rounded-2xl">
                ยังไม่มีข้อมูลผังที่นั่ง-รายชื่อสำหรับโครงการนี้
              </div>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-200 border border-slate-300 rounded-2xl hover:border-slate-300 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{doc.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500 font-medium">{doc.date || 'ไม่ระบุวันที่'}</span>
                        <a href={doc.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 font-semibold hover:underline">ทดสอบลิงก์</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleEdit(doc)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(doc.id)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}




function OtherDocumentManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
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
  };

  const handleEdit = (doc: { id: string; name: string; date: string; url: string }) => {
    setFormData({ name: doc.name, date: doc.date, url: doc.url });
    setEditingId(doc.id);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setFormData({ name: '', date: '', url: '' });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', date: '', url: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !formData.name.trim() || !formData.url.trim()) return;

    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        const currentDocs = p.other_documents || [];
        if (editingId) {
          return { ...p, other_documents: currentDocs.map(d => d.id === editingId ? { ...d, ...formData } : d) };
        } else {
          const newDoc = { id: Date.now().toString(), ...formData };
          return { ...p, other_documents: [...currentDocs, newDoc] };
        }
      }
      return p;
    }));
    closeForm();
  };

  const other_documents = selectedProject?.other_documents || [];

  return (
    <div className="bg-slate-200 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg mb-1">จัดการเอกสารที่เกี่ยวข้อง</h3>
          <p className="text-sm text-slate-500 font-medium">เพิ่มหรือแก้ไขลิงก์ไฟล์เอกสารที่เกี่ยวข้องแยกตามโครงการ</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <SearchableProjectDropdown
            projects={projects}
            value={selectedProjectId}
            onChange={(id) => {
              setSelectedProjectId(id);
              setIsFormOpen(false);
              setEditingId(null);
            }}
          />
          <button onClick={openAddForm} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
            <Plus size={16} /> เพิ่มเอกสารที่เกี่ยวข้อง
          </button>
        </div>
      </div>

        {deleteConfirmId && (
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
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-200 hover:bg-slate-200 rounded-xl transition-colors flex-1"
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

      {!selectedProject ? (
        <div className="text-center py-8 text-slate-500 font-medium text-sm">
          กรุณาเลือกโครงการที่ต้องการจัดการ
        </div>
      ) : (
        <>
          {isFormOpen && (
            <form onSubmit={handleSubmit} className="mb-6 bg-slate-100 p-5 rounded-2xl border border-slate-300">
              <h4 className="font-bold text-slate-700 mb-4">{editingId ? 'แก้ไขเอกสารที่เกี่ยวข้อง' : 'เพิ่มเอกสารที่เกี่ยวข้องใหม่'}</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ชื่อเอกสารที่เกี่ยวข้อง <span className="text-indigo-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ระบุชื่อเอกสารที่เกี่ยวข้อง..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ลิงก์ URL ของไฟล์ <span className="text-indigo-500">*</span></label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">วันที่ (เช่น 14/8/2569)</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="ระบุวันที่..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                    บันทึก
                  </button>
                  <button type="button" onClick={closeForm} className="bg-slate-200 border border-slate-300 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
                    ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {other_documents.length === 0 && !isFormOpen ? (
              <div className="text-center py-8 text-slate-500 font-medium text-sm border-2 border-dashed border-slate-300 rounded-2xl">
                ยังไม่มีข้อมูลเอกสารที่เกี่ยวข้องสำหรับโครงการนี้
              </div>
            ) : (
              other_documents.map((doc) => (
                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-200 border border-slate-300 rounded-2xl hover:border-slate-300 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <Files size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{doc.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500 font-medium">{doc.date || 'ไม่ระบุวันที่'}</span>
                        <a href={doc.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 font-semibold hover:underline">ทดสอบลิงก์</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleEdit(doc)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(doc.id)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}


function EbookManagement({ projects, setProjects }: { projects: ProjectItem[], setProjects: (p: ProjectItem[]) => void }) {
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
        return { ...p, ebook_documents: (p.ebook_documents || []).filter(d => d.id !== deleteConfirmId) };
      }
      return p;
    }));
    setDeleteConfirmId(null);
  };

  const handleDelete = (docId: string) => {
    setDeleteConfirmId(docId);
  };

  const handleEdit = (doc: { id: string; name: string; date: string; url: string }) => {
    setFormData({ name: doc.name, date: doc.date, url: doc.url });
    setEditingId(doc.id);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setFormData({ name: '', date: '', url: '' });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', date: '', url: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !formData.name.trim() || !formData.url.trim()) return;

    setProjects(projects.map(p => {
      if (p.id === selectedProjectId) {
        const currentDocs = p.ebook_documents || [];
        if (editingId) {
          return { ...p, ebook_documents: currentDocs.map(d => d.id === editingId ? { ...d, ...formData } : d) };
        } else {
          const newDoc = { id: Date.now().toString(), ...formData };
          return { ...p, ebook_documents: [...currentDocs, newDoc] };
        }
      }
      return p;
    }));
    closeForm();
  };

  const ebook_documents = selectedProject?.ebook_documents || [];

  return (
    <div className="bg-slate-200 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg mb-1">จัดการผังแนวทางดำเนินงาน</h3>
          <p className="text-sm text-slate-500 font-medium">เพิ่มหรือแก้ไขลิงก์ไฟล์ผังแนวทางดำเนินงานแยกตามโครงการ</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <SearchableProjectDropdown
            projects={projects}
            value={selectedProjectId}
            onChange={(id) => {
              setSelectedProjectId(id);
              setIsFormOpen(false);
              setEditingId(null);
            }}
          />
          <button onClick={openAddForm} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
            <Plus size={16} /> เพิ่มผังแนวทางดำเนินงาน
          </button>
        </div>
      </div>

        {deleteConfirmId && (
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
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-200 hover:bg-slate-200 rounded-xl transition-colors flex-1"
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

      {!selectedProject ? (
        <div className="text-center py-8 text-slate-500 font-medium text-sm">
          กรุณาเลือกโครงการที่ต้องการจัดการ
        </div>
      ) : (
        <>
          {isFormOpen && (
            <form onSubmit={handleSubmit} className="mb-6 bg-slate-100 p-5 rounded-2xl border border-slate-300">
              <h4 className="font-bold text-slate-700 mb-4">{editingId ? 'แก้ไขผังแนวทางดำเนินงาน' : 'เพิ่มผังแนวทางดำเนินงานใหม่'}</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ชื่อผังแนวทางดำเนินงาน <span className="text-indigo-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ระบุชื่อผังแนวทางดำเนินงาน..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ลิงก์ URL ของไฟล์ <span className="text-indigo-500">*</span></label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">วันที่ (เช่น 14/8/2569)</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="ระบุวันที่..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium bg-slate-200"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
                    บันทึก
                  </button>
                  <button type="button" onClick={closeForm} className="bg-slate-200 border border-slate-300 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
                    ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {ebook_documents.length === 0 && !isFormOpen ? (
              <div className="text-center py-8 text-slate-500 font-medium text-sm border-2 border-dashed border-slate-300 rounded-2xl">
                ยังไม่มีข้อมูลผังแนวทางดำเนินงานสำหรับโครงการนี้
              </div>
            ) : (
              ebook_documents.map((doc) => (
                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-200 border border-slate-300 rounded-2xl hover:border-slate-300 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{doc.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500 font-medium">{doc.date || 'ไม่ระบุวันที่'}</span>
                        <a href={doc.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 font-semibold hover:underline">ทดสอบลิงก์</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleEdit(doc)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(doc.id)} className="w-9 h-9 flex items-center justify-center bg-slate-200 border border-slate-300 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
