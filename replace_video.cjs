const fs = require('fs');
const path = './src/views/DataViews.tsx';
let content = fs.readFileSync(path, 'utf8');

const newVideoView = `
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
    const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? \`https://img.youtube.com/vi/\${match[2]}/hqdefault.jpg\` 
      : null;
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Video Archive</h2>
        {(isAdmin || true) && !isAdding && (
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
                      {(isAdmin || true) && (
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
`;

content = content.replace(/export function VideoView\([\s\S]*?^}/m, newVideoView.trim());
fs.writeFileSync(path, content);
