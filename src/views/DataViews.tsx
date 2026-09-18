import React, { useState } from 'react';
import { Download, Plus, FileText, Files, ImageIcon, Video, ExternalLink, MessageSquare, HelpCircle, Edit, Trash2, X, Check, MessageCircle } from 'lucide-react';
import { ProjectItem, QAQuestion } from '../types';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

export function DownloadView({ activeProject }: { activeProject?: ProjectItem }) {
  const documents = activeProject?.documents || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-[#1e1b4b] dark:text-white mb-6">ผังที่นั่ง-รายชื่อ</h2>
      <div className="space-y-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
             <div key={doc.id} className="bg-white rounded-[14px] p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4 sm:gap-5">
                 <div className="w-[52px] h-[52px] bg-[#eef4ff] text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0">
                   <FileText size={26} strokeWidth={2} />
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
                 ดาวน์โหลด
               </button>
             </div>
          ))
        ) : (
          <div className="bg-white rounded-[14px] p-24 border border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-white text-slate-300 rounded-full flex items-center justify-center mb-4">
              <FileText size={40} />
            </div>
            <p className="text-slate-400 font-semibold">ยังไม่มีข้อมูลผังที่นั่ง-รายชื่อในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
}
export function OtherDocsView({ activeProject }: { activeProject?: ProjectItem }) {
  const documents = activeProject?.other_documents || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-[#1e1b4b] dark:text-white mb-6">เอกสารที่เกี่ยวข้อง</h2>
      <div className="space-y-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
             <div key={doc.id} className="bg-white rounded-[14px] p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4 sm:gap-5">
                 <div className="w-[52px] h-[52px] bg-[#eef4ff] text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0">
                   <FileText size={26} strokeWidth={2} />
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
                 ดาวน์โหลด
               </button>
             </div>
          ))
        ) : (
          <div className="bg-white rounded-[14px] p-24 border border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-white text-slate-300 rounded-full flex items-center justify-center mb-4">
              <Files size={40} />
            </div>
            <p className="text-slate-400 font-semibold">ยังไม่มีข้อมูลเอกสารที่เกี่ยวข้องในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
}
export function SmartQAView({ 
  activeProject, 
  isAdmin = false,
  questions = [],
  setQuestions 
}: { 
  activeProject?: ProjectItem, 
  isAdmin?: boolean,
  questions?: QAQuestion[],
  setQuestions?: React.Dispatch<React.SetStateAction<QAQuestion[]>>
}) {
  const qaLink = activeProject?.links?.qa;
  const [questionText, setQuestionText] = React.useState('');
  const [replyingId, setReplyingId] = React.useState<number | null>(null);
  const [replyText, setReplyText] = React.useState('');
  
  const formatThaiDateTime = (date: Date) => {
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = (date.getFullYear() + 543).toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} • ${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const id = Date.now();
    const newQuestion = {
      id,
      q: questionText,
      time: formatThaiDateTime(new Date()),
      isAnswered: false,
      projectId: activeProject?.id || '1'
    };

    await setDoc(doc(db, 'qa_questions', String(id)), newQuestion);
    setQuestionText('');
  };
  
  const handleReplySubmit = async (id: number) => {
    if (!replyText.trim()) return;
    await updateDoc(doc(db, 'qa_questions', String(id)), { isAnswered: true, answer: replyText });
    setReplyingId(null);
    setReplyText('');
  };

if (qaLink) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">Smart Q&A</h2>
        <p className="text-slate-500 text-sm font-medium mb-6">ส่งคำถามถึงวิทยากรแบบนิรนาม ไม่ต้องเปิดเผยตัวตน</p>
        
        <div className="bg-white rounded-3xl p-16 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
            <HelpCircle size={36} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">เข้าสู่ระบบสอบถามวิทยากร</h3>
          <p className="text-slate-500 mb-8 font-medium">เข้าสู่แพลตฟอร์ม Q&A เพื่อส่งคำถามได้เลย</p>
          <button 
            onClick={() => window.open(qaLink, '_blank')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-emerald-200"
          >
            <ExternalLink size={20} />
            เปิด Smart Q&A
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">Smart Q&A</h2>
      <p className="text-slate-500 text-sm font-medium mb-6">ส่งคำถามถึงวิทยากรแบบนิรนาม ไม่ต้องเปิดเผยตัวตน</p>
      
      {!isAdmin && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-200 dark:border-slate-700 mb-10">
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
        </div>
      )}

      <div>
        <h3 className="font-extrabold text-slate-800 dark:text-white mb-5 text-sm uppercase tracking-wider px-1">
          {isAdmin ? 'รายการคำถาม' : 'คำถามล่าสุด'}
        </h3>
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <HelpCircle size={18} className="text-amber-500" />
                    <p className="text-slate-800 font-semibold text-base">{q.q}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{q.time}</p>
                </div>
                {isAdmin && !q.isAnswered && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">รอดำเนินการ</span>
                )}
                {q.isAnswered && (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">ตอบแล้ว</span>
                )}
              </div>
              
              {q.isAnswered && q.answer && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex gap-2">
                    <MessageCircle size={16} className="text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-blue-700 mb-1">ตอบกลับจากผู้จัดงาน:</p>
                      <p className="text-sm text-slate-700 font-medium">{q.answer}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {isAdmin && !q.isAnswered && replyingId !== q.id && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setReplyingId(q.id)}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle size={16} />
                    ตอบกลับ
                  </button>
                </div>
              )}
              
              {isAdmin && replyingId === q.id && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <textarea 
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="พิมพ์คำตอบของคุณที่นี่..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm mb-3"
                  ></textarea>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setReplyingId(null)}
                      className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      ยกเลิก
                    </button>
                    <button 
                      onClick={() => handleReplySubmit(q.id)}
                      className="px-4 py-2 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                    >
                      ส่งคำตอบ
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {questions.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-400 font-medium">ยังไม่มีคำถามในขณะนี้</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GalleryView({ activeProject, isAdmin = false }: { activeProject?: ProjectItem, isAdmin?: boolean }) {
  const galleryLink = activeProject?.links?.gallery;
  const photos = activeProject?.photos || [];
  const [isAdding, setIsAdding] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newUrl, setNewUrl] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');
  const [lightboxPhoto, setLightboxPhoto] = React.useState<{url: string, title: string, description?: string} | null>(null);

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !newTitle.trim() || !newUrl.trim()) return;

    const newPhoto = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      url: newUrl,
      dateAdded: new Date().toISOString()
    };

    try {
      await updateDoc(doc(db, 'projects', activeProject.id), {
        photos: [...photos, newPhoto]
      });
      setIsAdding(false);
      setNewTitle('');
      setNewUrl('');
      setNewDesc('');
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!activeProject) return;
    if (!window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) return;
    try {
      await updateDoc(doc(db, 'projects', activeProject.id), {
        photos: photos.filter(p => p.id !== photoId)
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Photo Gallery</h2>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors font-bold shadow-sm"
          >
            <Plus size={18} />
            เพิ่มรูปภาพ
          </button>
        )}
      </div>

      {galleryLink && (
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white text-blue-500 rounded-full flex items-center justify-center shrink-0">
               <ImageIcon size={24} />
             </div>
             <div>
               <h3 className="font-bold text-blue-900">คลังภาพหลัก (Google Drive / Shared Folder)</h3>
               <p className="text-blue-700 text-sm">ดูรูปภาพทั้งหมดที่แชร์สำหรับโครงการนี้</p>
             </div>
           </div>
           <button 
             onClick={() => window.open(galleryLink, '_blank')}
             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
           >
             <ExternalLink size={18} />
             เปิดลิงก์
           </button>
        </div>
      )}

      {isAdding && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ImageIcon size={20} className="text-blue-500" /> เพิ่มรูปภาพใหม่
          </h3>
          <form onSubmit={handleAddPhoto} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">ชื่อรูปภาพ *</label>
              <input 
                type="text" 
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="เช่น บรรยากาศงาน..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">ลิงก์รูปภาพ (URL) *</label>
              <input 
                type="url" 
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">รายละเอียดเพิ่มเติม (ไม่บังคับ)</label>
              <textarea 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 resize-none"
                placeholder="รายละเอียดสังเขป..."
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                type="submit"
                className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-colors shadow-sm"
              >
                บันทึกรูปภาพ
              </button>
            </div>
          </form>
        </div>
      )}

      {photos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-full aspect-video bg-slate-100 relative group cursor-pointer" onClick={() => setLightboxPhoto(photo)}>
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = 'https://placehold.co/600x400/f8fafc/94a3b8?text=Image+Not+Found';
                  }}
                />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{photo.title}</h3>
                {photo.description && (
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{photo.description}</p>
                )}
                
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-400">
                    เพิ่มเมื่อ: {new Date(photo.dateAdded).toLocaleDateString('th-TH')}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => window.open(photo.url, '_blank')}
                      className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      title="เปิดดู"
                    >
                      <ExternalLink size={16} />
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="ลบ"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !galleryLink && !isAdding && (
          <div className="bg-white rounded-3xl p-16 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
               <ImageIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">ยังไม่มีรูปภาพ</h3>
            <p className="text-slate-500 font-medium">เพิ่มลิงก์รูปภาพเพื่อให้ผู้ร่วมโครงการรับชม</p>
          </div>
        )
      )}

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxPhoto(null)}
        >
          <button 
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors"
          >
            <X size={24} />
          </button>
          
          <div 
            className="max-w-5xl w-full max-h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 min-h-0 flex items-center justify-center">
              <img 
                src={lightboxPhoto.url} 
                alt={lightboxPhoto.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = 'https://placehold.co/800x600/1e293b/94a3b8?text=Image+Not+Found';
                }}
              />
            </div>
            
            <div className="bg-black/50 backdrop-blur-md p-6 mt-4 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">{lightboxPhoto.title}</h3>
              {lightboxPhoto.description && (
                <p className="text-slate-300">{lightboxPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function VideoView({ activeProject, isAdmin = false }: { activeProject?: ProjectItem, isAdmin?: boolean }) {
  const videoLink = activeProject?.links?.video;
  const videos = activeProject?.videos || [];
  const [isAdding, setIsAdding] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newUrl, setNewUrl] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !newTitle.trim() || !newUrl.trim()) return;

    const newVideo = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      url: newUrl,
      dateAdded: new Date().toISOString()
    };

    try {
      await updateDoc(doc(db, 'projects', activeProject.id), {
        videos: [...videos, newVideo]
      });
      setIsAdding(false);
      setNewTitle('');
      setNewUrl('');
      setNewDesc('');
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (!activeProject) return;
    if (!window.confirm('คุณต้องการลบวิดีโอนี้ใช่หรือไม่?')) return;
    try {
      await updateDoc(doc(db, 'projects', activeProject.id), {
        videos: videos.filter(v => v.id !== videoId)
      });
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  // Helper function to extract YouTube ID for thumbnail
  const getYoutubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg` 
      : null;
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Video Archive</h2>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors font-bold shadow-sm"
          >
            <Plus size={18} />
            เพิ่มวิดีโอ
          </button>
        )}
      </div>

      {videoLink && (
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white text-red-500 rounded-full flex items-center justify-center shrink-0">
               <Video size={24} />
             </div>
             <div>
               <h3 className="font-bold text-red-900">คลังวิดีโอหลัก (Google Drive / Shared Folder)</h3>
               <p className="text-red-700 text-sm">ดูวิดีโอทั้งหมดที่แชร์สำหรับโครงการนี้</p>
             </div>
           </div>
           <button 
             onClick={() => window.open(videoLink, '_blank')}
             className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
           >
             <ExternalLink size={18} />
             เปิดลิงก์
           </button>
        </div>
      )}

      {isAdding && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Video size={20} className="text-red-500" /> เพิ่มวิดีโอใหม่
          </h3>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">ชื่อวิดีโอ *</label>
              <input 
                type="text" 
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="เช่น พิธีเปิดโครงการ"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">ลิงก์วิดีโอ (YouTube, Google Drive, ฯลฯ) *</label>
              <input 
                type="url" 
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">รายละเอียดเพิ่มเติม (ไม่บังคับ)</label>
              <textarea 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 h-20 resize-none"
                placeholder="รายละเอียดสังเขป..."
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                type="submit"
                className="px-5 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-colors shadow-sm"
              >
                บันทึกวิดีโอ
              </button>
            </div>
          </form>
        </div>
      )}

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => {
            const ytThumbnail = getYoutubeThumbnail(video.url);
            
            return (
              <div key={video.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                {ytThumbnail ? (
                  <div className="w-full aspect-video bg-slate-100 relative group cursor-pointer" onClick={() => window.open(video.url, '_blank')}>
                    <img src={ytThumbnail} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => window.open(video.url, '_blank')}>
                    <div className="w-16 h-16 bg-white text-slate-400 rounded-full flex items-center justify-center shadow-sm">
                      <Video size={28} />
                    </div>
                  </div>
                )}
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{video.description}</p>
                  )}
                  
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-400">
                      เพิ่มเมื่อ: {new Date(video.dateAdded).toLocaleDateString('th-TH')}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.open(video.url, '_blank')}
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="เปิดดู"
                      >
                        <ExternalLink size={16} />
                      </button>
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !videoLink && !isAdding && (
          <div className="bg-white rounded-3xl p-16 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
               <Video size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">ยังไม่มีวิดีโอ</h3>
            <p className="text-slate-500 font-medium">เพิ่มลิงก์วิดีโอ YouTube หรือ Google Drive เพื่อให้ผู้ร่วมโครงการรับชม</p>
          </div>
        )
      )}
    </div>
  );
}
