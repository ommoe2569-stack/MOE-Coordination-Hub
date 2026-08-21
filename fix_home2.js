import fs from 'fs';
let content = fs.readFileSync('src/views/HomeView.tsx', 'utf8');

const filterLogic = `
  const activeProject = projects.find(p => p.isActive);
  const activeSessions = sessions.filter(s => activeProject ? s.projectId === activeProject.id : false);
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  
  const visibleButtons = quickAccessButtons.filter(btn => {
    if (!activeProject) return true;
    return activeProject.features?.[btn.view] !== false;
  });
`;

content = content.replace(
  /const activeProject = projects\.find\(p => p\.isActive\);\s*const activeSessions = sessions\.filter\(s => activeProject \? s\.projectId === activeProject\.id : false\);\s*const \[timeLeft, setTimeLeft\] = useState\(\{ days: '00', hours: '00', minutes: '00', seconds: '00' \}\);/,
  filterLogic
);

fs.writeFileSync('src/views/HomeView.tsx', content);
