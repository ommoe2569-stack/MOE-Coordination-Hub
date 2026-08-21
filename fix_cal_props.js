import fs from 'fs';
let content = fs.readFileSync('src/views/CalendarView.tsx', 'utf8');

// Update Props
content = content.replace(
  'interface CalendarViewProps {\n  projects: ProjectItem[];\n  setProjects?: React.Dispatch<React.SetStateAction<ProjectItem[]>>;\n}',
  "import { CalendarEvent } from '../types';\n\ninterface CalendarViewProps {\n  events: CalendarEvent[];\n  setEvents?: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;\n}"
);

// Update Component Signature
content = content.replace(
  'export default function CalendarView({ projects, setProjects }: CalendarViewProps) {',
  'export default function CalendarView({ events, setEvents }: CalendarViewProps) {'
);

// We should also replace the selectedProject type from ProjectItem to CalendarEvent
content = content.replace(
  'const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);',
  'const [selectedProject, setSelectedProject] = useState<CalendarEvent | null>(null);'
);

// getProjectsForDate -> getEventsForDate
content = content.replace(
  'const getProjectsForDate = (day: number) => {',
  'const getEventsForDate = (day: number) => {'
);
content = content.replace(
  'return projects.filter(p => p.startDate === dateStr);',
  'return events.filter(e => e.date === dateStr);'
);
content = content.replace(
  'const dayProjects = getProjectsForDate(day);',
  'const dayEvents = getEventsForDate(day);'
);
content = content.replace(
  '{dayProjects.map(project => (',
  '{dayEvents.map(project => ('
);

// Update Add Modal to use CalendarEvent and setEvents
content = content.replace(
  'if (newProject.name.trim() && setProjects) {\n                    const newItem: ProjectItem = {\n                      id: \'p\' + Date.now(),\n                      name: newProject.name,\n                      startDate: addingToDate,\n                      startTime: newProject.startTime || \'08:00\',\n                      location: newProject.location,\n                      isActive: true\n                    };\n                    setProjects([...projects, newItem]);\n                  }',
  `if (newProject.name.trim() && setEvents && addingToDate) {
                    const newItem: CalendarEvent = {
                      id: 'e' + Date.now(),
                      name: newProject.name,
                      date: addingToDate,
                      startTime: newProject.startTime || '08:00',
                      location: newProject.location,
                      description: newProject.description
                    };
                    setEvents([...events, newItem]);
                  }`
);

// The selected project detail modal should use selectedProject.description instead of hardcoded text
content = content.replace(
  'กิจกรรมโครงการ {selectedProject.name} จัดขึ้นเพื่อให้บุคลากรได้เข้าร่วมแลกเปลี่ยนความรู้และพัฒนาศักยภาพตามกำหนดการ',
  '{selectedProject.description || "ไม่มีรายละเอียด"}'
);

fs.writeFileSync('src/views/CalendarView.tsx', content);
