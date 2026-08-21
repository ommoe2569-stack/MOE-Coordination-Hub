import fs from 'fs';
const replaceInFile = (file, replaces) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  for (const { from, to } of replaces) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(file, content);
};

// AdminView
replaceInFile('src/views/AdminView.tsx', [
  { from: 'bg-blue-', to: 'bg-indigo-' },
  { from: 'text-blue-', to: 'text-indigo-' },
  { from: 'border-blue-', to: 'border-indigo-' },
  { from: 'shadow-blue-', to: 'shadow-indigo-' },
]);
// But wait, there might have been some legitimate 'blue' things in AdminView?
// "bg-blue-600 text-white shadow-md shadow-blue-200" for the active tab!
