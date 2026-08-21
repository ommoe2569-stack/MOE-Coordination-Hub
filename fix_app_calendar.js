import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "return <CalendarView projects={projects} />;",
  "return <CalendarView projects={projects} setProjects={setProjects} />;"
);

fs.writeFileSync('src/App.tsx', content);
