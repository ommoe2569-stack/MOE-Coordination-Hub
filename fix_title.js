import fs from 'fs';
let content = fs.readFileSync('src/views/SimpleViews.tsx', 'utf8');
content = content.replace('แบบแจ้งรายชื่อ เข้าร่วมงาน', 'แบบแจ้งรายชื่อผู้เข้าร่วมประชุม');
fs.writeFileSync('src/views/SimpleViews.tsx', content);
