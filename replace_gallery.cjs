const fs = require('fs');
const path = './src/views/DataViews.tsx';
let content = fs.readFileSync(path, 'utf8');

const newGalleryView = `
export function GalleryView({ activeProject, isAdmin = false }: { activeProject?: ProjectItem, isAdmin?: boolean }) {
  const galleryLink = activeProject?.links?.gallery;
  const photos = activeProject?.photos || [];
  const [isAdding, setIsAdding] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newUrl, setNewUrl] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');

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
              <div className="w-full aspect-video bg-slate-100 relative group cursor-pointer" onClick={() => window.open(photo.url, '_blank')}>
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
    </div>
  );
}
`;

content = content.replace(/export function GalleryView\([\s\S]*?^}/m, newGalleryView.trim());
fs.writeFileSync(path, content);
