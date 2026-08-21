import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/id: '1',[\s\S]*?tagColor: 'bg-emerald-50 text-emerald-700'/g, match => match.replace('bg-emerald-50 text-emerald-700', 'bg-pink-100 text-pink-700'));
content = content.replace(/id: '4',[\s\S]*?tagColor: 'bg-emerald-50 text-emerald-700'/g, match => match.replace('bg-emerald-50 text-emerald-700', 'bg-amber-100 text-amber-700'));
content = content.replace(/id: '6',[\s\S]*?tagColor: 'bg-emerald-50 text-emerald-700'/g, match => match.replace('bg-emerald-50 text-emerald-700', 'bg-emerald-100 text-emerald-700'));
content = content.replaceAll('bg-blue-50 text-blue-700', 'bg-blue-100 text-blue-700');

fs.writeFileSync('src/App.tsx', content);
