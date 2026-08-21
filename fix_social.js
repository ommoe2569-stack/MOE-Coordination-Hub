import fs from 'fs';

// Update DataViews.tsx
let dataContent = fs.readFileSync('src/views/DataViews.tsx', 'utf8');

// Also we need Edit and Trash icons, let's make sure they are imported.
if (!dataContent.includes('Edit,')) {
  dataContent = dataContent.replace(
    "import { Download, Plus, FileText, ImageIcon, ExternalLink, MessageSquare, HelpCircle } from 'lucide-react';",
    "import { Download, Plus, FileText, ImageIcon, ExternalLink, MessageSquare, HelpCircle, Edit, Trash2, X, Check } from 'lucide-react';"
  );
}

// Add state for editing
const socialInitial = `export function SocialWallView({ activeProject, isAdmin = false }: { activeProject?: ProjectItem, isAdmin?: boolean }) {
  const socialLink = activeProject?.links?.social;
  const [posts, setPosts] = React.useState([`;

dataContent = dataContent.replace(
  `export function SocialWallView({ activeProject }: { activeProject?: ProjectItem }) {\n  const socialLink = activeProject?.links?.social;\n  const [posts, setPosts] = React.useState([`,
  socialInitial
);

// Add editing post state
const stateLogic = `
  const [isPosting, setIsPosting] = React.useState(false);
  const [postText, setPostText] = React.useState('');
  const [editingPostId, setEditingPostId] = React.useState<number | null>(null);
  const [editPostText, setEditPostText] = React.useState('');

  const handleDelete = (id: number) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleEditStart = (post: any) => {
    setEditingPostId(post.id);
    setEditPostText(post.content);
  };

  const handleEditSave = () => {
    if (!editPostText.trim()) return;
    setPosts(posts.map(p => p.id === editingPostId ? { ...p, content: editPostText } : p));
    setEditingPostId(null);
    setEditPostText('');
  };
`;

dataContent = dataContent.replace(
  `const [isPosting, setIsPosting] = React.useState(false);\n  const [postText, setPostText] = React.useState('');`,
  stateLogic
);

// Update rendering of posts to include Edit/Delete buttons
const postRender = `{posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-200 relative overflow-hidden group">
            {post.isAdmin && <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>}
            
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className={\`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm \${post.isAdmin ? 'bg-gradient-to-br from-slate-700 to-slate-900 text-white' : 'bg-white text-slate-600'}\`}>
                  {post.isAdmin ? 'ADM' : 'USR'}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">{post.author}</h4>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{post.time}</p>
                </div>
              </div>
              
              {isAdmin && editingPostId !== post.id && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEditStart(post)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {editingPostId === post.id ? (
              <div className="mt-2">
                <textarea
                  value={editPostText}
                  onChange={(e) => setEditPostText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 mb-3 text-sm"
                  rows={3}
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingPostId(null)} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <X size={16} /> ยกเลิก
                  </button>
                  <button onClick={handleEditSave} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Check size={16} /> บันทึก
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-slate-600 text-sm space-y-3 mb-2 leading-relaxed font-medium whitespace-pre-wrap">
                {post.content}
              </div>
            )}
          </div>
        ))}`;

// In original, it starts around {posts.map((post) => (
dataContent = dataContent.replace(
  /\{posts\.map\(\(post\) => \([\s\S]*?<\/div>\s*\)\)\}/,
  postRender
);

fs.writeFileSync('src/views/DataViews.tsx', dataContent);

// Update App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  "case 'social': return <SocialWallView activeProject={activeProject} />;",
  "case 'social': return <SocialWallView activeProject={activeProject} isAdmin={isAdmin} />;"
);

fs.writeFileSync('src/App.tsx', appContent);
