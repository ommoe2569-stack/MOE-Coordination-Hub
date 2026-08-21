import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
if (!content.includes('import CalendarView')) {
  content = content.replace(
    "import AdminView from './views/AdminView';",
    "import AdminView from './views/AdminView';\nimport CalendarView from './views/CalendarView';"
  );
}

// Add to switch case
if (!content.includes("case 'calendar':")) {
  content = content.replace(
    "switch (currentView) {",
    "switch (currentView) {\n      case 'calendar':\n        return <CalendarView projects={projects} />;"
  );
}

fs.writeFileSync('src/App.tsx', content);
