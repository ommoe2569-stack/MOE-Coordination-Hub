import fs from 'fs';

let content = fs.readFileSync('src/views/DataViews.tsx', 'utf8');

const newGalleryView = `export function GalleryView({ activeProject }: { activeProject?: ProjectItem }) {
  const galleryLink = activeProject?.links?.gallery;

  const mockImages = [
    { id: 1, name: '1000024916.jpg', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: '1000024839.jpg', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: '1000024917.jpg', url: 'https://images.unsplash.com/photo-1475721028070-281cb912Fac0?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: '1000024840.jpg', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: '1000024918.jpg', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: '1000024841.jpg', url: 'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">Photo Gallery</h2>
        {galleryLink && (
          <button 
            onClick={() => window.open(galleryLink, '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl flex items-center gap-2 text-sm transition-all shadow-sm"
          >
            <ExternalLink size={16} />
            เปิดโฟลเดอร์รูปภาพ
          </button>
        )}
      </div>

      {galleryLink ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockImages.map((img) => (
            <div key={img.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-[4/3] w-full bg-slate-100">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 bg-white">
                <p className="text-[#1e1b4b] font-extrabold text-sm truncate">{img.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-24 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mb-4">
             <ImageIcon size={40} />
          </div>
          <p className="text-slate-400 font-semibold">ยังไม่มีรูปภาพในขณะนี้</p>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(
  /export function GalleryView\(\{ activeProject \}: \{ activeProject\?: ProjectItem \}\) \{[\s\S]*?\}\s*export function ContactView/,
  newGalleryView + '\n\nexport function ContactView'
);

fs.writeFileSync('src/views/DataViews.tsx', content);
