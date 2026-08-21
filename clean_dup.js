import fs from 'fs';
let content = fs.readFileSync('src/views/HomeView.tsx', 'utf8');

const regex = /const visibleButtons = quickAccessButtons\.filter\(btn => \{\s*if \(\!activeProject\) return true;\s*return activeProject\.features\?\.\[btn\.view\] \!\=\= false;\s*\}\);\s*const visibleButtons = quickAccessButtons\.filter\(btn => \{\s*if \(\!activeProject\) return true;\s*return activeProject\.features\?\.\[btn\.view\] \!\=\= false;\s*\}\);/;

content = content.replace(regex, `const visibleButtons = quickAccessButtons.filter(btn => {
    if (!activeProject) return true;
    return activeProject.features?.[btn.view] !== false;
  });`);

fs.writeFileSync('src/views/HomeView.tsx', content);
