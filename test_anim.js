import fs from 'fs';
let content = fs.readFileSync('src/views/CalendarView.tsx', 'utf8');

// Also adjust the text to duplicate safely
content = content.replace(
  `{project.name} {project.name.length > 20 && <span className="pl-4">{project.name}</span>}`,
  `{project.name} {project.name.length > 15 && <span className="pl-8">{project.name}</span>}`
);

fs.writeFileSync('src/views/CalendarView.tsx', content);
