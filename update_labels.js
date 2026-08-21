import fs from 'fs';

const filesToUpdate = [
  'src/views/ManualView.tsx',
  'src/views/SimpleViews.tsx',
  'src/views/AdminView.tsx',
  'src/views/HomeView.tsx',
  'src/components/Sidebar.tsx',
  'src/App.tsx'
];

filesToUpdate.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/ลงทะเบียน \(แจ้งรายชื่อ\)/g, 'แบบแจ้งรายชื่อ');
  fs.writeFileSync(file, content);
});
