import fs from 'fs';

// 1. types.ts
let typesContent = fs.readFileSync('src/types.ts', 'utf8');
if (!typesContent.includes('CalendarEvent')) {
  typesContent += `
export interface CalendarEvent {
  id: string;
  name: string;
  date: string;
  startTime: string;
  location: string;
  description: string;
}
`;
  fs.writeFileSync('src/types.ts', typesContent);
}

// 2. App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
if (!appContent.includes('calendarEvents')) {
  appContent = appContent.replace(
    "import { ViewType, SessionItem, ProjectItem, UserItem } from './types';",
    "import { ViewType, SessionItem, ProjectItem, UserItem, CalendarEvent } from './types';"
  );
  
  appContent = appContent.replace(
    "const [users, setUsers] = useState<UserItem[]>([",
    `const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: 'e1',
      name: 'การประชุมเชิงปฏิบัติการ เรื่อง การเสริมสร้างประสิทธิภาพและพัฒนาเครือข่ายการประสานงานภารกิจการเมือง',
      date: '2026-08-14',
      startTime: '08:00',
      location: 'ห้องประชุมพินิตประชานาถ',
      description: 'กิจกรรมโครงการ การประชุมเชิงปฏิบัติการ เรื่อง การเสริมสร้างประสิทธิภาพและพัฒนาเครือข่ายการประสานงานภารกิจการเมือง จัดขึ้นเพื่อให้บุคลากรได้เข้าร่วมแลกเปลี่ยนความรู้และพัฒนาศักยภาพตามกำหนดการ'
    }
  ]);
  const [users, setUsers] = useState<UserItem[]>([`
  );
  
  appContent = appContent.replace(
    "<CalendarView projects={projects} setProjects={setProjects} />",
    "<CalendarView events={calendarEvents} setEvents={setCalendarEvents} />"
  );
  
  fs.writeFileSync('src/App.tsx', appContent);
}
