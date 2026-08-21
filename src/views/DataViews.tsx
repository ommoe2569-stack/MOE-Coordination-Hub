import React, { useState } from 'react';
import { Download, Plus, FileText, Files, ImageIcon, ExternalLink, MessageSquare, HelpCircle, Edit, Trash2, X, Check, MessageCircle } from 'lucide-react';
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

export function GalleryView({ activeProject }: { activeProject?: ProjectItem }) {
  const galleryLink = activeProject?.links?.gallery;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6">Photo Gallery</h2>
      <div className="bg-white rounded-3xl p-24 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mb-4">
           <ImageIcon size={40} />
        </div>
        {galleryLink ? (
          <>
            <p className="text-slate-600 font-semibold mb-6">มีการแชร์คลังภาพสำหรับโครงการนี้</p>
            <button 
              onClick={() => window.open(galleryLink, '_blank')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-blue-200"
            >
              <ExternalLink size={20} />
              เปิด Photo Gallery
            </button>
          </>
        ) : (
          <p className="text-slate-400 font-semibold">ยังไม่มีรูปภาพในขณะนี้</p>
        )}
      </div>
    </div>
  );
}
