import fs from 'fs';

const revertFile = (file, replacements) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  for (const { from, to } of replacements) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(file, content);
};

// Global App + Views
const views = fs.readdirSync('src/views').filter(f => f.endsWith('.tsx')).map(f => `src/views/${f}`);
const globalFiles = ['src/App.tsx', 'src/components/Sidebar.tsx', ...views];

for (const file of globalFiles) {
  revertFile(file, [
    { from: 'bg-white', to: 'bg-slate-100' },
    { from: 'border-slate-100', to: 'border-slate-200' },
  ]);
}

revertFile('src/App.tsx', [
  { from: 'bg-slate-50', to: 'bg-slate-200' },
  { from: 'bg-blue-600', to: 'from-blue-600 to-indigo-700' },
  { from: 'bg-emerald-50 text-emerald-700', to: 'bg-pink-100 text-pink-700' }, // Approximation for App tags
  // Actually wait, let's reverse the tags in App.tsx manually to avoid messing up.
]);

